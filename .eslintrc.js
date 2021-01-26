module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    "airbnb-typescript/base",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  rules: {
    "no-console": 0,
    "no-bitwise": 0,
    "no-restricted-syntax": 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/camelcase': 0,
    'max-len': ["error", { "code": 88 }],
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "import/order": ["error", {
      "newlines-between": "always",
      "groups": [
        ["builtin", "external", "internal"],
        ["parent", "sibling"],
        "index",
      ],
    }],
  },
};