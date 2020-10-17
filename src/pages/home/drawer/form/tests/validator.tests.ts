import { nonEmpty, mustBeNumber } from '@ui/text-input/validator';

describe('nonEmpty', () => {
  it('is valid to have any string', () => {
    expect(nonEmpty('a')).toBe(true);
  });

  it('is not valid to have an empty string', () => {
    expect(nonEmpty('')).toBe(false);
  });
});

describe('mustBeNumber', () => {
  it('is valid to have integer', () => {
    expect(mustBeNumber('1')).toBe(true);
  });

  it('is valid to have negative number', () => {
    expect(mustBeNumber('-1')).toBe(true);
  });

  it('is valid to have decimal', () => {
    expect(mustBeNumber('-2.4')).toBe(true);
  });

  it('is not valid to have comma', () => {
    expect(mustBeNumber('3,000')).toBe(false);
  });

  it('is not valid to contain letter', () => {
    expect(mustBeNumber('3.2s')).toBe(false);
  });
});
