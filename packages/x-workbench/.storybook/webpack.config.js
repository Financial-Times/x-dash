const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	resolve: {
		alias: {
			'react': require.resolve('react')
		}
	},
	plugins: [
		xEngine()
	]
};
