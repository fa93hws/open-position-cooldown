import { resolve } from 'path';

import { Mode } from './webpack-mode';
import { repoDir } from '../paths';

export function getCssLoaderOption(mode: Mode) {
  const localIdentName =
    mode === Mode.DEV ? '[path][name]__[local]' : '[hash:base64:8]';
  return {
    modules: {
      mode: 'local',
      localIdentContext: resolve(repoDir, 'src'),
      localIdentName,
      exportLocalsConvention: 'camelCase',
    },
    sourceMap: mode === Mode.PROD,
  };
}
