const xRollup = require('@financial-times/x-rollup')
const pkg = require('./package.json')

xRollup({ input: './src/privacy-manager.jsx', pkg })
