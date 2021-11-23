/* eslint no-undef: "off", no-unused-vars: "off" */
// This module is just a placeholder to be re-written at build time.
const runtime = require(X_ENGINE_RUNTIME_MODULE)
const render = require(X_ENGINE_RENDER_MODULE)

module.exports.h = X_ENGINE_FACTORY
module.exports.render = X_ENGINE_RENDER
module.exports.Component = X_ENGINE_COMPONENT
module.exports.Fragment = X_ENGINE_FRAGMENT
