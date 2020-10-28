const assignDeep = require('assign-deep')
const deepGet = require('./concerns/deep-get')
const resolvePkg = require('./concerns/resolve-pkg')
const resolvePeer = require('./concerns/resolve-peer')
const formatConfig = require('./concerns/format-config')

module.exports = function () {
	// 1. try to load the application's package manifest
	const pkg = require(resolvePkg())

	// 2. if we have the manifest then find the engine configuration
	const raw = deepGet(pkg, 'x-dash.engine.browser')

	if (!raw) {
		throw new Error(`x-engine requires a browser runtime to be specified. none found in ${pkg.name}`)
	}

	// 3. format the configuration we've loaded
	const config = formatConfig(raw)

	// 4. if this module is a linked dependency then resolve Webpack & runtime to CWD
	const webpackResolution = resolvePeer('webpack')
	const runtimeResolution = resolvePeer(config.runtime)
	const renderResolution = resolvePeer(config.renderModule)

	const webpack = require(webpackResolution)

	return {
		apply(compiler) {
			// 5. alias the runtime name to the resolved runtime path
			assignDeep(compiler.options, {
				resolve: {
					alias: {
						[config.runtime]: runtimeResolution,
						[config.renderModule]: renderResolution
					}
				}
			})

			const replacements = {
				X_ENGINE_RUNTIME_MODULE: `"${config.runtime}"`,
				X_ENGINE_FACTORY: config.factory ? `runtime["${config.factory}"]` : 'runtime',
				X_ENGINE_COMPONENT: config.component ? `runtime["${config.component}"]` : 'null',
				X_ENGINE_FRAGMENT: config.fragment ? `runtime["${config.fragment}"]` : 'null',
				X_ENGINE_RENDER_MODULE: `"${config.renderModule}"`,
				X_ENGINE_RENDER: config.render ? `render["${config.render}"]` : 'null'
			}

			// The define plugin performs direct text replacement
			// <https://webpack.js.org/plugins/define-plugin/>
			const define = new webpack.DefinePlugin(replacements)

			define.apply(compiler)
		}
	}
}
