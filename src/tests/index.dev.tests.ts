const listen = jest.fn();
const on = jest.fn();
const libraryMock = jest.mock('socket.io-client', () => ({
  io: (url: string) => {
    listen(url);
    return { on };
  },
}));

/* eslint-disable import/first */
import { cleanup } from '@testing-library/react';

import { start } from '../index.dev';

describe('index.dev.tsx', () => {
  beforeEach(() => {
    on.mockRestore();
    listen.mockRestore();
    cleanup();
  });

  it('can not be imported in production environment', () => {
    expect(() => start({ importPage: false, env: 'production' })).toThrow();
  });

  it('can be imported in development environment', () => {
    start({ importPage: false, env: 'development', port: '7664' });
    expect(listen).toBeCalledWith('http://localhost:7664');
    expect(on).toBeCalledWith('browserReload', expect.any(Function));
    libraryMock.restoreAllMocks();
  });
});
