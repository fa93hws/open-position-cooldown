import * as path from 'path';

import { DevServerRouter, ResultKind, startDevServer } from '../dev-server';

describe('DevServerRouter', () => {
  const staticFolder = path.join(__dirname, 'fixtures');

  describe('without base url', () => {
    const router = new DevServerRouter({ staticFolder, baseUrl: undefined });

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

  describe('with base url', () => {
    const router = new DevServerRouter({ staticFolder, baseUrl: 'fixtures' });

    it('is 404 if request is not starts with baseurl', () => {
      const result = router.getRoutes('/bar/bar.js');
      expect(result).toEqual({ kind: ResultKind.NOT_FOUND });
    });

    it('is static file', () => {
      const result = router.getRoutes('/fixtures/bar/bar.js');
      expect(result).toEqual({
        kind: ResultKind.STATIC_FILE,
        file: path.join(staticFolder, 'bar', 'bar.js'),
      });
    });
  });
});

describe('startDevServer', () => {
  it('can starts the server', () => {
    expect(() => {
      const server = startDevServer({
        port: 1234,
        socket: ((arg: any) => arg) as any,
        mute: true,
        buildOutputFolder: '',
      });
      server.close();
    }).not.toThrow();
  });
});
