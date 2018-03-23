const { DefinePlugin } = require('webpack');

module.exports = {
	resolve: {
		alias: {
			'react': require.resolve('react')
		}
	},
	plugins: [
		new DefinePlugin({
			'X_ENGINE_RUNTIME': '"react"',
			'X_ENGINE_RESOLVE': 'runtime.createElement'
		})
	]
};
