import socket from 'socket.io-client';

if (process.env.NODE_ENV !== 'development') {
  throw new Error(
    'this file should only be included in development environment',
  );
}

const io = socket(`http://localhost:${process.env.PORT}`);

io.on('browserReload', () => {
  document.location.reload();
});

import './index.tsx'; // eslint-disable-line import/first
