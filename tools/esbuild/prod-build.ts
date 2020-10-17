import * as path from 'path';
import { buildSync } from 'esbuild';

import { ensureFolder } from './utils';
import { getProdOption } from './options';
import { getBuildArtifactFolder } from '../paths';
import { doBuild as _doBuild } from './do-build';

export function main({
  doBuild = _doBuild,
}: { doBuild?: typeof _doBuild } = {}) {
  const buildOutputFolder = path.join(__dirname, '..', '..', 'target');
  const buildArtifactFolder = getBuildArtifactFolder(buildOutputFolder);
  ensureFolder(buildArtifactFolder);
  const options = getProdOption({
    outdir: buildArtifactFolder,
  });

  doBuild({
    esbuild: () => buildSync(options),
    buildOutputFolder,
    hashFile: true,
  });
}
