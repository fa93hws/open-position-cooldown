import * as path from 'path';

import { DevServerRouter, ResultKind } from '../dev-server';

describe('DevServerRouter', () => {
  const staticFolder = path.join(__dirname, 'fixtures');
  const router = new DevServerRouter(staticFolder);

  it('is bad request', () => {
    const result = router.getRoutes(undefined);
    expect(result).toEqual({ kind: ResultKind.BAD });
  });

  it('is static file request', () => {
    const result = router.getRoutes('/bar/bar.js');
    expect(result).toEqual({
      kind: ResultKind.STATIC_FILE,
      file: path.join(staticFolder, 'bar', 'bar.js'),
    });
  });

  it('resolves index.html in the directory', () => {
    const result = router.getRoutes('/foo');
    expect(result).toEqual({
      kind: ResultKind.STATIC_FILE,
      file: path.join(staticFolder, 'foo', 'index.html'),
    });
  });

  it('fallback to index.html if request is a directory that does not contain index.html', () => {
    const result = router.getRoutes('/bar');
    expect(result).toEqual({
      kind: ResultKind.STATIC_FILE,
      file: path.join(staticFolder, 'index.html'),
    });
  });

  it('fallback to index.html if request is a directory that does not exist', () => {
    const result = router.getRoutes('/baz/bas');
    expect(result).toEqual({
      kind: ResultKind.STATIC_FILE,
      file: path.join(staticFolder, 'index.html'),
    });
  });

  it('is 404 if request is a file that does not exist', () => {
    const result = router.getRoutes('/baz/bas.js');
    expect(result).toEqual({ kind: ResultKind.NOT_FOUND });
  });
});
