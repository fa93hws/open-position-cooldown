// module resolution is a bit different in jest, looking for solution
const socket = require('socket.io-client'); // eslint-disable-line

export function start({
  importPage = true,
  env = process.env.NODE_ENV,
  port = process.env.PORT,
}: {
  importPage?: boolean;
  env?: string;
  port?: string;
} = {}) {
  if (env !== 'development') {
    throw new Error(
      'this file should only be included in development environment',
    );
  }

  const io = socket(`http://localhost:${port}`);

  io.on('browserReload', () => {
    document.location.reload();
  });

  if (importPage) {
    import('./index');
  }
}

if (process.env.NODE_ENV !== 'test') {
  start();
}
