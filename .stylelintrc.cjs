module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier-scss', 'stylelint-config-property-sort-order-smacss'],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  ignoreFiles: ['node_modules/**/*.scss', 'src/**/*.astro'],
  rules: {
    'scss/comment-no-empty': null,
    'scss/load-no-partial-leading-underscore': null,
    'prettier/prettier': true,
    'no-descending-specificity': null,
    'no-empty-source': null
  }
}
