module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.tests.ts{,x}'],
  collectCoverageFrom: ['src/**/*.ts{,x}', 'tools/**/*.ts', '!**/fixtures/**'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
    'fontsource-roboto': 'identity-obj-proxy',
    '@styles/(.*)$': '<rootDir>/src/styles/$1',
    '@ui/(.*)$': '<rootDir>/src/ui/$1',
  },
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-serializer-html'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};
