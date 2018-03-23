const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const findUp = require('find-up');
const path = require('path');
const merge = require('lodash.merge');

const repoBase = path.dirname(findUp.sync('lerna.json'));

module.exports = (baseConfig, env) => {
	const config = genDefaultConfig(baseConfig, env);

	config.module.rules.forEach(rule => {
		if(rule.include) {
			rule.include = repoBase;
		}
	});

	const babelRule = config.module.rules.find(rule => rule.loader.match(/babel-loader/));

	if(babelRule && Array.isArray(babelRule.exclude)) {
		// things that need not-babelling. dist is already compiled, we shouldn't
		// touch node_modules, and stories need their own babel config.
		babelRule.exclude.push(
			/\/dist\//,
			/\/node_modules\//,
			/\/stories\//,
		);
	}

	config.module.rules.push({
		test: /\/stories\/.+\.jsx?$/,
		loader: 'babel-loader',
		include: repoBase,
		query: {
			babelrc: false,
			plugins: [
				['transform-react-jsx', {
					pragma: 'h'
				}]
			]
		}
	});

	merge(config, {resolve: {
		alias: {
			'@storybook/addons': require.resolve('@storybook/addons'),
			'react': require.resolve('react'),
		},
		plugins: [
			new DefinePlugin({
				'ENGINE_RUNTIME': '"react"',
				'ENGINE_RESOLVE': 'runtime.createElement'
			})
		]
	}});

	return config;
};
