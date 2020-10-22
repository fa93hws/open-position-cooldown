import { cleanup } from '@testing-library/react';

describe('App', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV;
    cleanup();
  });

  it('is able to be mounted', () => {
    const element = document.createElement('div');
    element.id = 'root';
    document.body.appendChild(element);
    expect(element.innerHTML).toEqual('');
    require('../index.tsx'); // eslint-disable-line global-require
    expect(element.innerHTML).not.toEqual('');
  });
});
