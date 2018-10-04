const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const xEngine = require('@financial-times/x-engine/src/webpack');
const getBabelConfig = require('@financial-times/x-babel-config');
const path = require('path');
const { Serialiser } = require('@financial-times/x-interaction');

const app = express();
const publicPath = '/static';

require('@financial-times/n-handlebars')(app, {
	directory: '.',
	helpers: {
		x: require('@financial-times/x-handlebars')(),
	},
});

const compiler = webpack({
	output: {
		publicPath,
	},
	plugins: [
		xEngine()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
				options: getBabelConfig(),
			},
		],
	},
	mode: 'development',
});

app.use(webpackMiddleware(compiler, {
	publicPath,
	serverSideRender: true,
}));

app.use((req, res) => {
	const {assetsByChunkName} = res.locals.webpackStats.toJson();
	res.locals.serialiser = new Serialiser();

	res.render('index', {
		publicPath,
		jsAssets: [].concat(assetsByChunkName.main).filter(path => path.endsWith('.js')),
		cssAssets: [].concat(assetsByChunkName.main).filter(path => path.endsWith('.css')),
	});
});

app.listen(1370, () => {
	/* eslint no-console:off */
	console.log('\nSSR demo listening on http://localhost:1370\n')
});
