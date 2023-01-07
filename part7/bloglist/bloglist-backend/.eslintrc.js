module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    // 'indent': [
    //   'error',
    //   2
    // ],
    // 'linebreak-style': [
    //   'error',
    //   'windows'
    // ],
    // 'quotes': [
    //   'error',
    //   'single'
    // ],
    // 'semi': [
    //   'error',
    //   'never'
    // ],
    // 'eqeqeq': 'error',
    // 'no-trailing-spaces': 'error',
    // 'object-curly-spacing': [
    //   'error', 'always'
    // ],
    // 'arrow-spacing': [
    //   'error', { 'before': true, 'after': true }
    // ],
    // 'no-console': 0,
    // 'no-unused-vars': [
    //   'error', { 'args': 'none' }
    // ]
  },
};
