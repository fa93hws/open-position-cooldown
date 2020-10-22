module.exports = {
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
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  transformIgnorePatterns: ['node_modules/@date-io/'],
  snapshotSerializers: ['jest-serializer-html'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.tsnode.json',
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
};
