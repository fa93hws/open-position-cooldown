import * as http from 'http';
import * as mime from 'mime';
import * as socket from 'socket.io';
import * as path from 'path';
import * as fs from 'fs';
import { green } from 'chalk';

import { UnreachableException } from '../../src/utils/unreachable-exception';
import { buildOutputFolder } from '../paths';

export const enum ResultKind {
  BAD,
  NOT_FOUND,
  STATIC_FILE,
}
type RouteResult =
  | {
      kind: ResultKind.BAD;
    }
  | {
      kind: ResultKind.NOT_FOUND;
    }
  | {
      kind: ResultKind.STATIC_FILE;
      file: string;
    };

export class DevServerRouter {
  constructor(private staticFolder: string) {}

  private returnStaticFile(file: string) {
    return {
      kind: ResultKind.STATIC_FILE,
      file,
    };
  }

  getRoutes(reqUrl: string | undefined): RouteResult {
    if (reqUrl == null) {
      return { kind: ResultKind.BAD };
    }
    const maybeFile = path.join(this.staticFolder, reqUrl);
    if (fs.existsSync(maybeFile)) {
      if (fs.lstatSync(maybeFile).isDirectory()) {
        if (fs.existsSync(path.join(maybeFile, 'index.html'))) {
          return this.returnStaticFile(path.join(maybeFile, 'index.html'));
        }
        return this.returnStaticFile(
          path.join(this.staticFolder, 'index.html'),
        );
      }
      return this.returnStaticFile(maybeFile);
    }
    if (path.extname(reqUrl) === '') {
      return this.returnStaticFile(path.join(this.staticFolder, 'index.html'));
    }
    return { kind: ResultKind.NOT_FOUND };
  }
}

export function startDevServer({ port }: { port: number }) {
  const router = new DevServerRouter(buildOutputFolder);
  const server = http.createServer((req, res) => {
    const routeResult = router.getRoutes(req.url);
    switch (routeResult.kind) {
      case ResultKind.BAD:
        res.writeHead(400);
        return res.end('url is null?');
      case ResultKind.NOT_FOUND:
        res.writeHead(404);
        return res.end(`can not find ${req.url}`);
      case ResultKind.STATIC_FILE:
        const mimeType = mime.getType(routeResult.file);
        mimeType && res.setHeader('Content-Type', mimeType);
        res.writeHead(200);
        return res.end(fs.readFileSync(routeResult.file));
      default:
        console.error(new UnreachableException(routeResult));
        res.writeHead(500);
        return res.end('internal error');
    }
  });
  server.listen(port);
  console.log(green(`dev server start@ http://localhost:${port}/`));
  return socket(server);
}
