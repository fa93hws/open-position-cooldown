import { render } from 'enzyme';
import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { theme } from '../../src/theme';

export function toMatchRenderedSnapshot(
  this: jest.MatcherUtils,
  jsx: React.ReactElement<unknown>,
): { message(): string; pass: boolean } {
  try {
    expect(
      render(<ThemeProvider theme={theme}>{jsx}</ThemeProvider>),
    ).toMatchSnapshot();

    return {
      message: () => 'expected JSX not to match snapshot',
      pass: true,
    };
  } catch (e) {
    return {
      message: () => `expected JSX to match snapshot: ${e.message}`,
      pass: false,
    };
  }
}
