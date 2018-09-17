const express = require('express');
const {Increment} = require('@financial-times/x-increment');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const xEngine = require('@financial-times/x-engine/src/webpack');
const { babelOptions } = require('@financial-times/x-rollup');
const path = require('path');
const {getInteractionSerialiser} = require('@financial-times/x-interaction');

const app = express();
const publicPath = '/static';

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
				options: babelOptions(),
			},
		],
	},
	mode: 'development',
});

app.use(webpackMiddleware(compiler, {
	publicPath,
	serverSideRender: true,
}));

const normalizeAssets = assets => [].concat(assets);

app.use((req, res) => {
	const {assetsByChunkName} = res.locals.webpackStats.toJson();
	const getInteractionData = getInteractionSerialiser();

	res.send(`<!doctype html>
<html>
	<head>
		<title>x-dash SSR interactivity demo</title>
		${normalizeAssets(assetsByChunkName.main)
			.filter(path => path.endsWith('.css'))
			.map(path => `<link rel="stylesheet" href="${publicPath}/${path}" />`)
			.join('\n')}
	</head>
	<body>
		<div id="root">
			${Increment({count: 1, timeout: 1000})}
		</div>
		${normalizeAssets(assetsByChunkName.main)
			.filter(path => path.endsWith('.js'))
			.map(path => `<script src="${publicPath}/${path}"></script>`)
			.join('\n')}

		${getInteractionData()}
	</body>
</html>`);
});

app.listen(1370, () => {
	/* eslint no-console:off */
	console.log('\nSSR demo listening on http://localhost:1370\n')
});
