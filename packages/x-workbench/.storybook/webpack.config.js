const path = require('path');
const findUp = require('find-up');
const xEngine = require('@financial-times/x-engine/src/webpack');

const repoBase = path.dirname(findUp.sync('lerna.json'));

module.exports = {
	module: {
		rules: [
			{
				test: /\/stories\/.+\.jsx?$/,
				loader: 'babel-loader',
				include: repoBase,
				options: {
					plugins: [
						[require.resolve('babel-plugin-transform-react-jsx'), {
							pragma: 'h'
						}]
					]
				}
			}
		]
	},
	resolve: {
		alias: {
			'@storybook/addons': require.resolve('@storybook/addons'),
			'react': require.resolve('react'),
		}
	},
	plugins: [
		xEngine()
	]
};
