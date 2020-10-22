import * as path from 'path';
import { buildSync } from 'esbuild';
import { TextDecoder } from 'util';

import { doBuild } from '../do-build';

describe('doBuild', () => {
  const decoder = new TextDecoder('utf-8');

  it('build the page', async () => {
    const buildOutputFolder = path.resolve(
      __dirname,
      'fixtures',
      'build-dummy-target',
    );
    const options = {
      bundle: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.BASE_URL': 'a',
      },
      entryPoints: [
        path.resolve(__dirname, 'fixtures', 'build-dummy', 'entry.ts'),
      ],
      minify: true,
      outdir: buildOutputFolder,
      platform: 'browser' as const,
      sourcemap: true,
      write: false,
    };

    const writeFileSync = jest.fn();
    await doBuild({
      esbuild: () => buildSync(options),
      hashFile: true,
      mute: true,
      writeFileSync,
      buildOutputFolder,
      existsSync: () => true,
    });
    expect(writeFileSync).toBeCalledTimes(3);
    const outputs = writeFileSync.mock.calls.reduce<Record<string, string>>(
      (acc, [filePath, content]) => {
        if (typeof content === 'string') {
          acc[filePath] = content;
        } else {
          acc[filePath] = decoder.decode(content);
        }
        return acc;
      },
      {},
    );
    expect(Object.keys(outputs).length).toEqual(3);
    expect(
      outputs[path.join(buildOutputFolder, 'b5d1382abb5b967c.js')],
    ).toEqual(
      [
        '(()=>{function r(){return"bar"}function n(){const o=r();return{foo:"production",bar:o}}n();})();',
        '//# sourceMappingURL=entry.js.map',
        '',
        // it comes from esbuild, where \n is used instead of dependent on os
      ].join('\n'),
    );
    expect(
      JSON.parse(outputs[path.join(buildOutputFolder, 'entry.js.map')]),
    ).toEqual({
      version: 3,
      sources: [
        'tools/esbuild/tests/fixtures/build-dummy/bar.ts',
        'tools/esbuild/tests/fixtures/build-dummy/entry.ts',
      ],
      sourcesContent: [
        ['export function bar() {', "  return 'bar';", '}', ''].join('\n'),
        [
          "import { bar } from './bar';",
          '',
          'function foo() {',
          '  const b = bar();',
          '  return {',
          '    foo: process.env.NODE_ENV,',
          '    bar: b,',
          '  };',
          '}',
          '',
          'foo();',
          '',
          // it comes from esbuild, where \n is used instead of dependent on os
        ].join('\n'),
      ],
      mappings:
        'MAAO,aACL,MAAO,MCCT,aACE,KAAM,GAAI,IACV,MAAO,CACL,IAAK,aACL,IAAK,GAIT',
      names: [],
    });
    expect(outputs[path.join(buildOutputFolder, 'index.html')]).toEqual(
      [
        '<!DOCTYPE html>',
        '<html lang="zh-cmn-Hans">',
        '  <head>',
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '    ',
        '    <link rel="icon" type="image/png" href="assets/cold-water.png" />',
        '    <title>买股冷静期</title>',
        '  </head>',
        '  <body>',
        '    <div id="root"></div>',
        '    <script src="b5d1382abb5b967c.js"></script>',
        '  </body>',
        '</html>',
        '',
        // it comes from template file, where \n is used instead of dependent on os
      ].join('\n'),
    );
  });
});
