module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:parcel/recommended'
  ],
  rules: {
    quotes: ['error', 'single'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }]
  }
}
