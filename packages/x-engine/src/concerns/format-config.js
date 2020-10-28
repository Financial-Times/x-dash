const presets = require('./presets')

/**
 * Format Config
 * @param {string|{ runtime: string, factory?: string }} config
 * @returns {{ runtime: string, factory: string }}
 */
module.exports = function (config) {
	// if configuration is a string, expand it
	if (typeof config === 'string') {
		if (presets.hasOwnProperty(config)) {
			config = presets[config]
		} else {
			config = { runtime: config, factory: null }
		}
	}

	if (typeof config.runtime !== 'string') {
		throw new TypeError('Engine configuration must define a runtime')
	}

	if (config.factory && typeof config.factory !== 'string') {
		throw new TypeError('Engine factory must be of type String.')
	}

	if (!config.renderModule) {
		config.renderModule = config.runtime
	}

	return config
}
