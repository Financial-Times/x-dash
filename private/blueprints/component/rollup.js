const xRollup = require('@financial-times/x-rollup')
const pkg = require('./package.json')

xRollup({ input: './src/{{componentName}}.jsx', pkg })
