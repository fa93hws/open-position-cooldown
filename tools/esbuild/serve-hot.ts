import * as path from 'path';
import * as fs from 'fs';
import { startService, Service, BuildOptions } from 'esbuild';
import { green, red, yellow } from 'chalk';
import { debounce } from 'lodash';

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
import { startDevServer } from './dev-server';

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

  const port = getPortNumber();
  const io = startDevServer({ port });
  fs.watch(srcFolder, { recursive: true }, () => {
    debouncedBuild(esbuildService, options, () => {
      console.log(green(`rebuild success@${new Date().toISOString()}`));
      io.emit('browserReload');
    });
  });
}
