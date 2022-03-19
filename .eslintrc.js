module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: '**/*.stories.*',
      rules: { 'react/jsx-props-no-spreading': 0 },
    },
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.*',
          '**/.storybook/**/*.*',
          '**/*.test.*',
          '**/jest.setup.ts',
          '**/__mocks__/**/*.ts',
        ],
        peerDependencies: true,
      },
    ],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
  },
}
