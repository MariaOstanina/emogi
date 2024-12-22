module.exports = {
  plugins: ['react', 'simple-import-sort'],
  extends: ['ts-react-important-stuff', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  "parserOptions": {
    "requireConfigFile": false,
  },
  rules: {
    semi: 'error',
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
      },
    ],
    'jsx-a11y/aria-role': 0,
    'react/jsx-curly-brace-presence': 2,
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          [
            // Side effect imports
            '^\\u0000',
            // Libs imports
            '^react$',
            '^[a-z]',
            // Imports starting with `@`
            '^@',
            // Imports starting with `../`
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Imports starting with `./`
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // Styles
            '^.+\\.s?css$',
          ],
        ],
      },
    ],
  },
};
