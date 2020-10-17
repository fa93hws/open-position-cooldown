import { main } from '../serve-hot';

describe('prod-build', () => {
  beforeEach(() => {
    process.env.BASE_URL = 'abc';
    process.env.PORT = '123';
  });

  afterEach(() => {
    delete process.env.BASE_URL;
    delete process.env.PORT;
  });

  it('can serve the page', async () => {
    const doBuild = jest.fn();
    const watcher = await main({
      doBuild,
      startDevServer: (() => undefined) as any,
    });
    watcher.close();
    expect(doBuild).toBeCalledTimes(1);
  });
});
