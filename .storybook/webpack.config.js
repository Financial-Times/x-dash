// This configuration extends the existing Storybook Webpack config.
// See https://storybook.js.org/configurations/custom-webpack-config/ for more info.

const path = require('path');
const fs = require('fs');
const xEngine = require('../packages/x-engine/src/webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WritePlugin = require('write-file-webpack-plugin');

const excludePaths = [/node_modules/, /dist/];

const cssCopy = fs.readdirSync(path.resolve('components')).reduce((mains, component) => {
	const componentPkg = path.resolve('components', component, 'package.json');

	if (fs.existsSync(componentPkg)) {
		const pkg = require(componentPkg);

		if (pkg.style) {
			const styleResolved = path.resolve('components', component, pkg.style);

			return mains.concat({
				from: styleResolved,
				to: path.resolve(__dirname, 'static/components', path.basename(pkg.name), pkg.style)
			});
		}
	}

	return mains;
}, []);

module.exports = ({ config }) => {
	// HACK: extend existing JS rule to ensure all dependencies are correctly ignored
	// from Babel transpilation.
	// https://github.com/storybooks/storybook/issues/3346#issuecomment-459439438
	const jsRule = config.module.rules.find((rule) => rule.test.test('.jsx'));
	jsRule.exclude = excludePaths;

	// HACK: Instruct Babel to check module type before injecting Core JS polyfills
	// https://github.com/i-like-robots/broken-webpack-bundle-test-case
	const babelConfig = jsRule.use.find(({ loader }) => loader === 'babel-loader');
	babelConfig.options.sourceType = 'unambiguous';

	// HACK: Ensure we only bundle one instance of React
	config.resolve.alias.react = require.resolve('react');

	config.plugins.push(xEngine(), new CopyPlugin(cssCopy), new WritePlugin());

	return config;
};
