module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'simple-import-sort', 'import', 'react-hooks', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // fix props passing cannot find
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    // sort-imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // sort props
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    'react/no-unescaped-entities': 'warn',
    // disallow the `any` type.
    '@typescript-eslint/no-explicit-any': 2,
    // unused-imports: warn, unused-vars: warn
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      // Any variables that are not used but need to be declare add _ before.
      // Example: _var1, _var2, _abc
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // enforces the Rules of Hooks.
    'react-hooks/rules-of-hooks': 'error',
  },
};
