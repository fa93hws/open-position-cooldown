import * as path from 'path';
import { writeFileSync } from 'fs';
import { buildSync } from 'esbuild';
import { green, red, yellow } from 'chalk';

import { ensureFolder, hashOutputs, generateHtml, copyAssets } from './utils';
import { getProdOption } from './options';
import {
  buildArtifactFolder,
  buildAssetsFolder,
  buildOutputFolder,
  publicAssetsFolder,
  publicFolder,
} from '../paths';

export function main() {
  ensureFolder(buildArtifactFolder);
  const options = getProdOption({
    outdir: buildArtifactFolder,
  });
  const buildResult = buildSync(options);
  if (buildResult.warnings.length > 0) {
    console.warn(yellow(buildResult.warnings));
  }
  if (buildResult.outputFiles == null || buildResult.outputFiles.length === 0) {
    console.error(red('no output files are generated'));
    process.exit(1);
  }
  const outputFiles = hashOutputs(buildResult.outputFiles);
  outputFiles.forEach((file) => {
    writeFileSync(file.path, file.contents);
  });
  generateHtml({
    templatePath: path.join(publicFolder, 'index.ejs'),
    files: outputFiles.map((f) => f.path),
    outdir: buildOutputFolder,
  });
  copyAssets({ from: publicAssetsFolder, to: buildAssetsFolder });
  console.log(green('build success'));
}
