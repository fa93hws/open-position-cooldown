import * as path from 'path';
import { ServerResponse } from 'http';

import {
  DevServerRouter,
  ResultKind,
  startDevServer,
  handleRouteResult,
} from '../dev-server';

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
        SocketServer: class {
          constructor(args: any) {
            return args;
          }
        } as any,
        mute: true,
        buildOutputFolder: '',
      });
      server.close();
    }).not.toThrow();
  });
});

describe('handleRouteResult', () => {
  const writeHead = jest.fn();
  const setHeader = jest.fn();
  const end = jest.fn();
  const res: ServerResponse = { writeHead, setHeader, end } as any;
  beforeEach(() => {
    writeHead.mockRestore();
    setHeader.mockRestore();
    end.mockRestore();
  });

  it('write 400 to status on bad request', () => {
    handleRouteResult({ kind: ResultKind.BAD }, res);
    expect(writeHead).toBeCalledWith(400);
    expect(end).toHaveBeenCalled();
  });

  it('write 404 to status on not found request', () => {
    handleRouteResult({ kind: ResultKind.NOT_FOUND }, res);
    expect(writeHead).toBeCalledWith(404);
    expect(end).toHaveBeenCalled();
  });

  it('returns file content', () => {
    handleRouteResult(
      {
        kind: ResultKind.STATIC_FILE,
        file: path.join(__dirname, 'fixtures', 'foo', 'index.html'),
      },
      res,
    );
    expect(writeHead).toBeCalledWith(200);
    expect(setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
    expect(end).toHaveBeenCalled();
  });

  it('returns 500 on unknown kind', () => {
    handleRouteResult({ kind: 'who am i' as any }, res, true);
    expect(writeHead).toBeCalledWith(500);
    expect(end).toHaveBeenCalled();
  });
});
