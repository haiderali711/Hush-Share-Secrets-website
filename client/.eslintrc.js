module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'never' }],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-textarea-mustache': [0]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
