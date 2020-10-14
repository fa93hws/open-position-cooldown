describe('index.dev.tsx', () => {
  it('can not be imported in production environment', () => {
    process.env.NODE_ENV = 'production';
    // eslint-disable-next-line global-require
    expect(() => require('../index.dev.tsx')).toThrow();
    delete process.env.NODE_ENV;
  });
});
