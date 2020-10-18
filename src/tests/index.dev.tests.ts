const listen = jest.fn();
const on = jest.fn();
const libraryMock = jest.mock('socket.io-client', () => (url: string) => {
  listen(url);
  return { on };
});

// eslint-disable-next-line import/first
import { start } from '../index.dev';

describe('index.dev.tsx', () => {
  beforeEach(() => {
    on.mockRestore();
    listen.mockRestore();
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
