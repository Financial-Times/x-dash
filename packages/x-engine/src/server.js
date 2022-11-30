const deepGet = require('./concerns/deep-get')
const resolvePkg = require('./concerns/resolve-pkg')
const resolvePeer = require('./concerns/resolve-peer')
const formatConfig = require('./concerns/format-config')

// 1. try to load the application's package manifest
const pkgPath = resolvePkg()
const pkg = require(pkgPath)

// 2. if we have the manifest then find the engine configuration
const raw = deepGet(pkg, 'x-dash.engine.server')

if (!raw) {
	throw new Error(`x-engine server configuration not found in ${pkg.name}'s package.json (${pkgPath}). this configuration is required so that x-engine knows which JSX runtime to use. follow the configuration guide to add this configuration: https://github.com/Financial-Times/x-dash/tree/main/packages/x-engine#configuration`)
}

// 3. format the configuration we've loaded
const config = formatConfig(raw)

// 4. if this module is a linked dependency then resolve required runtime to CWD
const runtime = require(resolvePeer(config.runtime))

// 5. if we've loaded the runtime then find its create element factory function
const factory = config.factory ? runtime[config.factory] : runtime

// 6. if we've loaded the runtime then find its Component constructor
const component = config.component ? runtime[config.component] : null

// 7. if we've loaded the runtime then find its Fragment object
const fragment = config.fragment ? runtime[config.fragment] : null

// 8. if the rendering module is different to the runtime, load it
const renderModule = config.renderModule ? require(resolvePeer(config.renderModule)) : runtime

// 9. if we've got the render module then find its render method
const render = config.render ? renderModule[config.render] : renderModule

module.exports.h = factory
module.exports.render = render
module.exports.Component = component
module.exports.Fragment = fragment
