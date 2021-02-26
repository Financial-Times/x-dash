const baseBabelConfig = require('@financial-times/x-babel-config')

module.exports = (...args) => {
	const base = baseBabelConfig(...args)

	// rollup-specific option not included in base config
	base.include = '**/*.{js,jsx}'
	base.babelHelpers = 'external'

	base.plugins.push(
		// Instruct Babel to not include any internal helper declarations in the output
		require.resolve('@babel/plugin-external-helpers')
	)

	return base
}
