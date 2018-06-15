const resolve = require('resolve-cwd');
const deepGet = require('./concerns/deep-get');
const formatConfig = require('./concerns/format-config');

// 1. try to load the application's package manifest
const pkg = require(resolve('./package.json'));

// 2. if we have the manifest then find the engine configuration
const raw = deepGet(pkg, 'x-dash.engine.server');

if (!raw) {
	throw new Error(`x-engine requires a server runtime to be specified. none found in ${pkg.name}`);
}

// 3. format the configuration we've loaded
const config = formatConfig(raw);

// 4. if this module is a linked dependency then resolve required runtime to CWD
const runtime = require(resolve(config.runtime));

// 5. if we've loaded the runtime then find its create element factory function
const factory = config.factory ? runtime[config.factory] : runtime;

// 6. if we've loaded the runtime then find its Component constructor
const component = config.component ? runtime[config.component] : null;

// 7. if the rendering module is different to the runtime, load it
const renderModule = config.renderModule ? require(resolve(config.renderModule)) : runtime;

// 8. if we've got the render module then find its render method
const render = config.render ? renderModule[config.render] : renderModule;

// TODO: switch to named exports only
module.exports = factory;
module.exports.h = factory;
module.exports.render = render;
module.exports.Component = component;
