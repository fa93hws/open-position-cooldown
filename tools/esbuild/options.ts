import * as path from 'path';
import { BuildOptions } from 'esbuild';

import { BUILD_MODE } from './utils';
import { srcFolder } from '../paths';

function getSharedOption({ outdir }: { outdir: string }): BuildOptions {
  return {
    entryPoints: [path.join(srcFolder, 'index.tsx')],
    outdir,
    loader: {
      '.svg': 'text',
    },
    platform: 'browser',
    bundle: true,
    write: false,
  };
}

export function getProdOption(params: { outdir: string }) {
  return {
    ...getSharedOption(params),
    define: {
      'process.env.NODE_ENV': `"${BUILD_MODE.PROD}"`,
    },
    minify: true,
  };
}

export function getDevOption(params: { outdir: string }) {
  return {
    ...getSharedOption(params),
    define: {
      'process.env.NODE_ENV': `"${BUILD_MODE.DEV}"`,
    },
    sourcemap: true,
  };
}
