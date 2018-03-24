const deepGet = require('./concerns/deep-get');
const loadManifest = require('./concerns/load-manifest');
const resolveModule = require('./concerns/resolve-module');

// 1. try to load the application's package manifest
const pkg = loadManifest();

// 2. if we have the manifest then find the engine configuration
const runtime = deepGet(pkg, 'x-dash.engine.browser');
const factory = deepGet(pkg, 'x-dash.engine.factory');

if (typeof runtime !== 'string') {
	throw new Error('x-engine requires a client runtime to be specified');
}

// 3. if this module is a linked dependency then resolve Webpack instance to CWD
const webpack = resolveModule('webpack');

module.exports = function() {
	// The define plugin performs direct text replacement
	// <https://webpack.js.org/plugins/define-plugin/>
	return new webpack.DefinePlugin({
		'X_ENGINE_RUNTIME': JSON.stringify(runtime),
		'X_ENGINE_RESOLVE': factory ? `runtime.${factory}` : 'runtime'
	});
};
