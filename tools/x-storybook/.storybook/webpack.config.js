const path = require('path');
const fs = require('fs');
const findUp = require('find-up');
const xEngine = require('@financial-times/x-engine/src/webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WritePlugin = require('write-file-webpack-plugin');

// TODO: Find a less obtuse heuristic?
const repoBase = path.dirname(findUp.sync('makefile'));

const cssCopy = fs.readdirSync(
	path.resolve(repoBase, 'components')
).reduce((mains, component) => {
	const componentPkg = path.resolve(repoBase, 'components', component, 'package.json');

	if(fs.existsSync(componentPkg)) {
		const pkg = require(componentPkg);

		if(pkg.style) {
			const styleResolved = path.resolve(repoBase, 'components', component, pkg.style);

			return mains.concat({
				from: styleResolved,
				to: path.resolve(__dirname, '../static/components', path.basename(pkg.name), pkg.style),
			});
		}
	}

	return mains;
}, []);

module.exports = {
	resolve: {
		alias: {
			'@storybook/addons': require.resolve('@storybook/addons'),
			'react': require.resolve('react'),
		}
	},
	plugins: [
		xEngine(),
		new CopyPlugin(cssCopy),
		new WritePlugin(),
	],
};
