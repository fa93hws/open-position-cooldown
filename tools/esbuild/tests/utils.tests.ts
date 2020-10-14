import * as path from 'path';
import { TextEncoder } from 'util';

import { hashOutputs, generateHtml } from '../utils';

describe('hashOutputs', () => {
  const enc = new TextEncoder();

  it('hash the filename with its content by md5', () => {
    const contents = enc.encode('123');
    const outputs = [
      {
        path: 'a/b/c/d.js',
        contents,
      },
      {
        path: 'b/e/d.sss.css',
        contents,
      },
    ];
    const hashedOutput = hashOutputs(outputs);
    expect(hashedOutput).toEqual([
      {
        path: 'a/b/c/202cb962ac59075b.js',
        contents,
      },
      {
        path: 'b/e/202cb962ac59075b.css',
        contents,
      },
    ]);
  });

  it('will not hash the filename for font file', () => {
    const contents = enc.encode('123');
    const outputs = [
      {
        path: 'a/b/c/d.woff',
        contents,
      },
      {
        path: 'b/e/d.sss.woff2',
        contents,
      },
    ];
    const hashedOutput = hashOutputs(outputs);
    expect(hashedOutput).toEqual(outputs);
  });
});

describe('generateHtml', () => {
  it('injects files into template', () => {
    const outdir = path.join(__dirname, 'fixtures');
    const templatePath = path.join(outdir, 'baz.ejs');
    const files = [
      path.join(outdir, 'foo', 'a.js'),
      path.join(outdir, 'b.css'),
      path.join(outdir, 'c.js'),
      path.join(outdir, 'bar', 'd.css'),
    ];

    const existsSync = () => true;
    const writeFileSync = jest.fn();

    generateHtml({
      templatePath,
      files,
      outdir,
      existsSync,
      writeFileSync,
    });

    expect(writeFileSync.mock.calls[0][1]).toMatchSnapshot();
    expect(writeFileSync.mock.calls[0][0]).toEqual(
      path.join(outdir, 'index.html'),
    );
  });
});
