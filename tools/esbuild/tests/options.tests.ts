import * as path from 'path';
import { getProdOption, getDevOption } from '../options';

describe('options', () => {
  afterEach(() => {
    delete process.env.BASE_URL;
    delete process.env.PORT;
  });

  it('produces the esbuild option in prod mode', () => {
    process.env.BASE_URL = 'open-position-cooldown';
    const prodOption = getProdOption({ outdir: 'target' });
    expect(prodOption).toEqual({
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.BASE_URL': '"open-position-cooldown"',
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
    process.env.BASE_URL = 'open-position-cooldown';
    process.env.PORT = '9999';
    const prodOption = getDevOption({ outdir: 'target' });
    expect(prodOption).toEqual({
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"development"',
        'process.env.BASE_URL': '"open-position-cooldown"',
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

  it('throws if BASE_URL is not set', () => {
    expect(() =>
      getProdOption({ outdir: 'target' }),
    ).toThrowErrorMatchingInlineSnapshot('"BASE_URL is not set"');
    expect(() =>
      getDevOption({ outdir: 'target' }),
    ).toThrowErrorMatchingInlineSnapshot('"BASE_URL is not set"');
  });

  it('thows if PORT is not set', () => {
    process.env.BASE_URL = 'open-position-cooldown';
    expect(() =>
      getDevOption({ outdir: 'target' }),
    ).toThrowErrorMatchingInlineSnapshot('"port must be provided"');
  });
});
