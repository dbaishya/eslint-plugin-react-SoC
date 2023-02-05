'use strict'

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: { configFile: './.babelrc' },
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    sourceType: 'script',
  },
}
