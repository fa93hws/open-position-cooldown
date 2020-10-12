import * as path from 'path';
import { getProdOption, getDevOption } from '../options';

describe('options', () => {
  it('produces the esbuild option in prod mode', () => {
    const prodOption = getProdOption({ outdir: 'target' });
    expect(prodOption).toEqual({
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      entryPoints: [
        path.resolve(__dirname, '..', '..', '..', 'src', 'index.tsx'),
      ],
      loader: {
        '.svg': 'text',
      },
      minify: true,
      outdir: 'target',
      platform: 'browser',
      write: false,
    });
  });

  it('produces the esbuild option in dev mode', () => {
    process.env.PORT = '9999';
    const prodOption = getDevOption({ outdir: 'target' });
    expect(prodOption).toEqual({
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"development"',
        'process.env.PORT': '9999',
      },
      entryPoints: [
        path.resolve(__dirname, '..', '..', '..', 'src', 'index.dev.tsx'),
      ],
      loader: {
        '.svg': 'text',
      },
      sourcemap: true,
      outdir: 'target',
      platform: 'browser',
      write: false,
    });
  });
});
