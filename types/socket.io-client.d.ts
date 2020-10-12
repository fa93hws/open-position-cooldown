declare module 'socket.io-client' {
  const io: SocketIOClientStatic;
  export default io;
}

interface SocketIOClientStatic {
  (uri: string, opts?: SocketIOClient.ConnectOpts): SocketIOClient.Emitter;
}

declare namespace SocketIOClient {
  interface Emitter {
    on(event: string, fn: (...args: any[]) => any): Emitter;
  }
}
