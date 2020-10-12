import socket from 'socket.io-client';

const io = socket(`http://localhost:${process.env.PORT}`);

io.on('browserReload', () => {
  document.location.reload();
});

import './index.tsx'; // eslint-disable-line import/first
