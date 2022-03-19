module.exports = {
  collectCoverageFrom: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/index.tsx',
    '!src/**/__stories__/**',
    '!src/**/.storybook/**/*.*',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.(css|scss|styl)$': 'identity-obj-proxy',
  },
  clearMocks: true,
}
