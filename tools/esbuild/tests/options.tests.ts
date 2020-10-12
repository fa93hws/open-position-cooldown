import * as path from 'path';
import { getProdOption } from '../options';

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
});
