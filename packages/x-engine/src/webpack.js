const assignDeep = require('assign-deep');
const deepGet = require('./concerns/deep-get');
const loadManifest = require('./concerns/load-manifest');
const formatConfig = require('./concerns/format-config');
const resolvedRequire = require('./concerns/resolved-require');
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

	// 4. if this module is a linked dependency then resolve Webpack & runtime to CWD
	const webpack = resolvedRequire('webpack');
	const runtimeResolution = resolveModule(config.runtime);

	return {
		apply(compiler) {
			// 5. alias the runtime name to the resolved runtime path
			assignDeep(compiler.options, {
				resolve: {
					alias: {
						[config.runtime]: runtimeResolution,
					},
				},
			});

			compiler.options.plugins.push(
				// The define plugin performs direct text replacement
				// <https://webpack.js.org/plugins/define-plugin/>
				new webpack.DefinePlugin({
					'X_ENGINE_RUNTIME': `"${config.runtime}"`,
					'X_ENGINE_RESOLVE': config.factory ? `runtime["${config.factory}"]` : 'runtime',
					'X_ENGINE_COMPONENT': config.component ? `runtime["${config.component}"]` : 'null'
				})
			);
		}
	};
};
