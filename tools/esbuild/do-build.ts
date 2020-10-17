import * as path from 'path';
import * as fs from 'fs';
import { BuildResult } from 'esbuild';
import { green, red, yellow } from 'chalk';

import { hashOutputs, generateHtml, copyAssets } from './utils';
import {
  getBuildAssetsFolder,
  publicAssetsFolder,
  publicFolder,
} from '../paths';

export async function doBuild({
  afterBuild,
  esbuild,
  hashFile,
  buildOutputFolder,
  writeFileSync = fs.writeFileSync,
  existsSync = fs.existsSync,
  mute = false,
}: {
  esbuild: () => Promise<BuildResult> | BuildResult;
  afterBuild?: () => void;
  hashFile: boolean;
  buildOutputFolder: string;
  writeFileSync?: typeof fs.writeFileSync;
  existsSync?: typeof fs.existsSync;
  mute?: boolean;
}) {
  mute || console.log(green(`build start@${new Date().toISOString()}`));
  const { warnings, outputFiles } = await esbuild();
  if (warnings.length > 0) {
    console.warn(yellow(warnings));
  }
  if (outputFiles == null || outputFiles.length === 0) {
    console.error(red('no output files are generated'));
    process.exit(1);
  }
  const buildFiles = hashFile ? hashOutputs(outputFiles) : outputFiles;
  buildFiles.forEach((file) => {
    writeFileSync(file.path, file.contents);
  });
  generateHtml({
    templatePath: path.join(publicFolder, 'index.ejs'),
    files: buildFiles.map((f) => f.path),
    outdir: buildOutputFolder,
    writeFileSync,
    existsSync,
  });
  const buildAssetsFolder = getBuildAssetsFolder(buildOutputFolder);
  copyAssets({ from: publicAssetsFolder, to: buildAssetsFolder });
  mute || console.log(green(`build success@${new Date().toISOString()}`));
  afterBuild && afterBuild();
}
