const deepGet = require('./concerns/deep-get');
const loadManifest = require('./concerns/load-manifest');
const formatConfig = require('./concerns/format-config');
const resolveModule = require('./concerns/resolve-module');

module.exports = function() {
	// 1. try to load the application's package manifest
	const pkg = loadManifest();

	// 2. if we have the manifest then find the engine configuration
	const raw = deepGet(pkg, 'x-dash.engine.browser');

	if (!raw) {
		throw new Error(`x-engine requires a browser runtime to be specified. none found in ${pkg.name}`);
	}

	// 3. format the configuration we've loaded
	const config = formatConfig(raw);

	// 4. if this module is a linked dependency then resolve Webpack instance to CWD
	const webpack = resolveModule('webpack');
	// The define plugin performs direct text replacement
	// <https://webpack.js.org/plugins/define-plugin/>
	return new webpack.DefinePlugin({
		'X_ENGINE_RUNTIME': `"${config.runtime}"`,
		'X_ENGINE_RESOLVE': config.factory ? `runtime["${config.factory}"]` : 'runtime'
	});
};
