import * as http from 'http';
import * as mime from 'mime';
import { Server } from 'socket.io';
import * as path from 'path';
import * as fs from 'fs';
import { green } from 'chalk';

import { UnreachableException } from '../../src/utils/unreachable-exception';

export const enum ResultKind {
  BAD = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  STATIC_FILE = 'STATIC_FILE',
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
  private readonly staticFolder: string;

  private readonly baseUrl: string | undefined;

  constructor({
    staticFolder,
    baseUrl,
  }: {
    staticFolder: string;
    baseUrl?: string;
  }) {
    this.staticFolder = staticFolder;
    this.baseUrl = baseUrl;
  }

  private returnStaticFile(file: string) {
    return {
      kind: ResultKind.STATIC_FILE,
      file,
    };
  }

  private trimBaseurl(reqUrl: string): string | undefined {
    if (this.baseUrl == null) {
      return reqUrl;
    }
    if (reqUrl.startsWith(`/${this.baseUrl}`)) {
      return reqUrl.substr(this.baseUrl.length + 1);
    }
    return undefined;
  }

  getRoutes(reqUrl: string | undefined): RouteResult {
    if (reqUrl == null) {
      return { kind: ResultKind.BAD };
    }
    const url = this.trimBaseurl(reqUrl);
    if (url == null) {
      return { kind: ResultKind.NOT_FOUND };
    }
    const maybeFile = path.join(this.staticFolder, url);
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
    if (path.extname(url) === '') {
      return this.returnStaticFile(path.join(this.staticFolder, 'index.html'));
    }
    return { kind: ResultKind.NOT_FOUND };
  }
}

export function handleRouteResult(
  routeResult: RouteResult,
  res: http.ServerResponse,
  mute = false,
) {
  switch (routeResult.kind) {
    case ResultKind.BAD:
      res.writeHead(400);
      return res.end('url is null?');
    case ResultKind.NOT_FOUND:
      res.writeHead(404);
      return res.end('resource does not exist');
    case ResultKind.STATIC_FILE:
      const mimeType = mime.getType(routeResult.file);
      mimeType && res.setHeader('Content-Type', mimeType);
      res.writeHead(200);
      return res.end(fs.readFileSync(routeResult.file));
    default:
      mute || console.error(new UnreachableException(routeResult));
      res.writeHead(500);
      return res.end('internal error');
  }
}

export function startDevServer({
  port,
  baseUrl,
  SocketServer = Server,
  mute = false,
  buildOutputFolder,
}: {
  port: number;
  baseUrl?: string;
  SocketServer?: typeof Server;
  mute?: boolean;
  buildOutputFolder: string;
}) {
  const router = new DevServerRouter({
    staticFolder: buildOutputFolder,
    baseUrl,
  });
  const server = http.createServer((req, res) => {
    const routeResult = router.getRoutes(req.url);
    handleRouteResult(routeResult, res);
  });
  server.listen(port);
  const hostLink = `http://localhost:${port}/${baseUrl ?? ''}/`;
  mute || console.log(green(`dev server start@${hostLink}`));
  return new SocketServer(server);
}
