import * as path from 'path';
import * as fs from 'fs';
import { startService, Service, BuildOptions } from 'esbuild';
import { green, red, yellow } from 'chalk';
import { debounce } from 'lodash';

import { ensureFolder, generateHtml, copyAssets } from './utils';
import { getDevOption } from './options';
import {
  buildArtifactFolder,
  buildAssetsFolder,
  buildOutputFolder,
  publicAssetsFolder,
  publicFolder,
  srcFolder,
} from '../paths';

async function doBuild(service: Service, options: BuildOptions) {
  console.log(green(`build start@${new Date().toISOString()}`));
  const { warnings, outputFiles } = await service.build(options);
  if (warnings.length > 0) {
    console.log('warn!');
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
  console.log(green(`build success@${new Date().toISOString()}`));
}

export async function main() {
  const esbuildService = await startService();
  ensureFolder(buildArtifactFolder);
  const options = getDevOption({
    outdir: buildArtifactFolder,
  });
  const debouncedBuild = debounce(doBuild, 100);
  debouncedBuild(esbuildService, options);
  fs.watch(srcFolder, { recursive: true }, () => {
    debouncedBuild(esbuildService, options);
  });
}
