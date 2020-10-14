import { TextEncoder } from 'util';

import { hashOutputs } from '../utils';

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
