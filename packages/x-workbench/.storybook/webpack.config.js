const path = require('path');
const findUp = require('find-up');
const xEngine = require('@financial-times/x-engine/src/webpack');

const repoBase = path.dirname(findUp.sync('lerna.json'));

module.exports = {
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
