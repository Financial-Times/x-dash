const deepGet = require('./concerns/deep-get');
const loadManifest = require('./concerns/load-manifest');
const formatConfig = require('./concerns/format-config');
const resolveModule = require('./concerns/resolve-module');

// 1. try to load the application's package manifest
const pkg = loadManifest();

// 2. if we have the manifest then find the engine configuration
const raw = deepGet(pkg, 'x-dash.engine.server');

if (!raw) {
	throw new Error(`x-engine requires a server runtime to be specified. none found in ${pkg.name}`);
}

// 3. format the configuration we've loaded
const config = formatConfig(raw);

// 4. if this module is a linked dependency then resolve required runtime to CWD
const runtime = resolveModule(config.runtime);

// 5. if we've loaded the runtime then find its create element factory function
const factory = config.factory ? runtime[config.factory] : runtime;

//6. if we've loaded the runtime then find its Component constructor
const component = config.component ? runtime[config.component] : null;

module.exports = factory;
module.exports.Component = component;
