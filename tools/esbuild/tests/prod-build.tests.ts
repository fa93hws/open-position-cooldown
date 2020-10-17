import { main } from '../prod-build';

describe('prod-build', () => {
  beforeEach(() => {
    process.env.BASE_URL = 'abc';
  });

  afterEach(() => {
    delete process.env.BASE_URL;
  });

  it('can build the page', () => {
    const doBuild = jest.fn();
    main({ doBuild });
    expect(doBuild).toBeCalled();
  });
});
