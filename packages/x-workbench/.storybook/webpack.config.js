const { DefinePlugin } = require('webpack');

module.exports = {
	resolve: {
		alias: {
			'react': require.resolve('react'),
			'@financial-times/x-engine': '@financial-times/x-engine/src/client'
		}
	},
	plugins: [
		new DefinePlugin({
			'ENGINE_RUNTIME': '"react"',
			'ENGINE_RESOLVE': 'runtime.createElement'
		})
	]
};
