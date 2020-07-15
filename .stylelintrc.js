module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  rules: {
    'no-descending-specificity': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
      }
    ]
  }
}
