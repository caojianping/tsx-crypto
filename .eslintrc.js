const path = require('path');
const resolve = (_path) => path.resolve(__dirname, _path);

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: resolve('./tsconfig.json'),
    tsconfigRootDir: resolve('./'),
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['off'],
    'no-debugger': ['off'],
  },
};
