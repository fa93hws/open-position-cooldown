import * as path from 'path';
import { BuildOptions } from 'esbuild';

import { BUILD_MODE } from './utils';
import { srcFolder } from '../paths';

export function getBaseUrl(): string {
  if (process.env.BASE_URL == null) {
    throw new Error('BASE_URL is not set');
  }
  return process.env.BASE_URL;
}

function getSharedOption({ outdir }: { outdir: string }): BuildOptions {
  return {
    outdir,
    loader: {
      '.svg': 'text',
    },
    define: {
      'process.env.BASE_URL': `"${getBaseUrl()}"`,
    },
    platform: 'browser',
    bundle: true,
    write: false,
  };
}

export function getProdOption(params: { outdir: string }) {
  const sharedOption = getSharedOption(params);
  return {
    ...sharedOption,
    entryPoints: [path.join(srcFolder, 'index.tsx')],
    define: {
      ...sharedOption.define,
      'process.env.NODE_ENV': `"${BUILD_MODE.PROD}"`,
    },
    minify: true,
  };
}

export function getPortNumber(): number {
  const portString = process.env.PORT;
  if (portString == null) {
    throw new Error('port must be provided');
  }
  const portNum = parseInt(portString, 10);
  if (portNum.toString() !== portString) {
    throw new Error(
      `parsed number is different from the input, input: ${portString}, parsed: ${portNum}`,
    );
  }
  return portNum;
}

export function getDevOption(params: { outdir: string }) {
  const sharedOption = getSharedOption(params);
  return {
    ...sharedOption,
    entryPoints: [path.join(srcFolder, 'index.dev.tsx')],
    define: {
      ...sharedOption.define,
      'process.env.NODE_ENV': `"${BUILD_MODE.DEV}"`,
      'process.env.PORT': getPortNumber().toString(),
    },
    sourcemap: true,
  };
}
