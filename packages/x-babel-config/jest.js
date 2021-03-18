const getBabelConfig = require('./')
const babelJest = require('babel-jest')

const base = getBabelConfig({
	targets: { node: 'current' },
	modules: 'commonjs'
})

module.exports = babelJest.createTransformer(base)
