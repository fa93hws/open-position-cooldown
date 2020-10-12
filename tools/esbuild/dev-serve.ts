import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import { startService, Service, BuildOptions } from 'esbuild';
import { green, red, yellow } from 'chalk';
import { debounce } from 'lodash';
import * as mime from 'mime';
import * as socket from 'socket.io';

import { ensureFolder, generateHtml, copyAssets } from './utils';
import { getDevOption, getPortNumber } from './options';
import {
  buildArtifactFolder,
  buildAssetsFolder,
  buildOutputFolder,
  publicAssetsFolder,
  publicFolder,
  srcFolder,
} from '../paths';

async function doBuild(
  service: Service,
  options: BuildOptions,
  afterBuild: () => void,
) {
  console.log(green(`build start@${new Date().toISOString()}`));
  const { warnings, outputFiles } = await service.build(options);
  if (warnings.length > 0) {
    console.warn(yellow(warnings));
  }
  if (outputFiles == null || outputFiles.length === 0) {
    console.error(red('no output files are generated'));
    process.exit(1);
  }
  outputFiles.forEach((file) => {
    fs.writeFileSync(file.path, file.contents);
  });
  generateHtml({
    templatePath: path.join(publicFolder, 'index.ejs'),
    files: outputFiles.map((f) => f.path),
    outdir: buildOutputFolder,
  });
  copyAssets(publicAssetsFolder, buildAssetsFolder);
  afterBuild();
}

function startDevServer() {
  const server = http.createServer((req, res) => {
    if (req.url == null) {
      res.writeHead(400);
      return res.end('url is null?');
    }
    const url = req.url === '/' ? 'index.html' : req.url;
    const file = path.join(buildOutputFolder, url);
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      return res.end(`can not find${file}`);
    }
    const mimeType = mime.getType(url);
    mimeType && res.setHeader('Content-Type', mimeType);
    res.writeHead(200);
    return res.end(fs.readFileSync(file));
  });
  const port = getPortNumber();
  server.listen(port);
  console.log(green(`dev server start@ http://localhost:${port}/`));
  return socket(server);
}

export async function main() {
  const esbuildService = await startService();
  ensureFolder(buildArtifactFolder);
  const options = getDevOption({
    outdir: buildArtifactFolder,
  });
  const debouncedBuild = debounce(doBuild, 100);
  debouncedBuild(esbuildService, options, () => {
    console.log(green(`build success@${new Date().toISOString()}`));
  });

  const io = startDevServer();
  fs.watch(srcFolder, { recursive: true }, () => {
    debouncedBuild(esbuildService, options, () => {
      console.log(green(`rebuild success@${new Date().toISOString()}`));
      io.emit('browserReload');
    });
  });
}
