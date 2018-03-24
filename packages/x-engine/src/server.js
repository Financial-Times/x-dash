const path = require('path');
const deepGet = require('./concerns/deep-get');
const loadManifest = require('./concerns/load-manifest');
const resolveModule = require('./concerns/resolve-module');

// 1. try to load the application's package manifest
const pkg = loadManifest();

// 2. if we have the manifest then find the engine configuration
const runtime = deepGet(pkg, 'x-dash.engine.server');

if (typeof runtime !== 'string') {
	throw new Error('x-engine requires a server runtime to be specified');
}

// 3. if this module is a linked dependency then resolve required runtime to CWD
const engine = resolveModule(runtime);

// 4. if we've loaded the runtime then find it's create element factory function
const factory = typeof engine === 'function' ? engine : (engine.createElement || engine.h);

module.exports = factory;
