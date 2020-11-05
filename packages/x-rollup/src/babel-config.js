const baseBabelConfig = require('@financial-times/x-babel-config')

module.exports = (...args) => {
	const base = baseBabelConfig(...args)

	base.plugins.push(
		// Instruct Babel to not include any internal helper declarations in the output
		require.resolve('@babel/plugin-external-helpers')
	)

	// rollup-specific option not included in base config
	base.include = '**/*.{js,jsx}'

	return base
}
