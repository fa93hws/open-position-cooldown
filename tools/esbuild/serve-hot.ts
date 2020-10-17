import * as fs from 'fs';
import * as path from 'path';
import { startService } from 'esbuild';
import { debounce } from 'lodash';

import { ensureFolder } from './utils';
import { getDevOption, getPortNumber, getBaseUrl } from './options';
import { getBuildArtifactFolder, srcFolder } from '../paths';
import { startDevServer as _startDevServer } from './dev-server';
import { doBuild as _doBuild } from './do-build';

export async function main({
  startDevServer = _startDevServer,
  doBuild = _doBuild,
}: {
  startDevServer?: typeof _startDevServer;
  doBuild?: typeof _doBuild;
} = {}) {
  const esbuildService = await startService();
  const buildOutputFolder = path.join(__dirname, '..', '..', 'target');
  const buildArtifactFolder = getBuildArtifactFolder(buildOutputFolder);
  ensureFolder(buildArtifactFolder);
  const options = getDevOption({
    outdir: buildArtifactFolder,
  });
  const esbuild = () => esbuildService.build(options);
  await doBuild({ esbuild, hashFile: false, buildOutputFolder });

  const debouncedBuild = debounce(doBuild, 100);
  const port = getPortNumber();
  const baseUrl = getBaseUrl();
  const io = startDevServer({ port, baseUrl, buildOutputFolder });

  function afterBuild() {
    io.emit('browserReload');
  }
  const watcher = fs.watch(srcFolder, { recursive: true }, () =>
    debouncedBuild({ esbuild, hashFile: false, afterBuild, buildOutputFolder }),
  );
  watcher.once('close', () => {
    esbuildService.stop();
  });
  return watcher;
}
