const path = require('path');
const fs = require('fs');
const findUp = require('find-up');
const xEngine = require('../packages/x-engine/src/webpack');
const webpack = require('webpack');
const getBabelConfig = require('../packages/x-babel-config');

module.exports = {
	resolve: {
		alias: {
			'@storybook/addons': require.resolve('@storybook/addons'),
			'react': require.resolve('react'),
		},
		mainFields: ['module', 'browser', 'main'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader?modules' ]
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, '../components'),
				exclude: /node_modules/,
				options: getBabelConfig(),
			},
		]
	},
	plugins: [
		xEngine(),
	],
};
