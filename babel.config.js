module.exports = {
  sourceType: 'unambiguous',
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ]
}
