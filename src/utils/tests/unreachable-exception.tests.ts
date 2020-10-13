import { UnreachableException } from '../unreachable-exception';

describe('UnreachableException', () => {
  it('throws this error', () => {
    const error = new UnreachableException(({
      kind: 'asdf',
      value: 'vadg',
    } as any) as never);
    expect(error).toMatchInlineSnapshot(
      `[Error: unreachable value: {"kind":"asdf","value":"vadg"}]`,
    );
  });
});
