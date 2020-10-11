module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'babel',
    'jest',
    'react-hooks',
    'jsx-a11y',
    'jest',
  ],
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/extensions': 'off',
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    'jest/no-test-callback': 'off',

    'no-useless-constructor': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'error',
    'class-methods-use-this': 'off',
    'no-continue': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-syntax': 'off',

    'react/display-name': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
