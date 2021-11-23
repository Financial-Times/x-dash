const path = require('path')
const xEngine = require('../packages/x-engine/src/webpack')
const webpack = require('webpack')

module.exports = {
	entry: './index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname)
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react'
		}),
		xEngine()
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
	}
}
