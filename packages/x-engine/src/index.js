const path = require('path');
const deepGet = require('./concerns/deep-get');

const cwd = process.cwd();

// 1. try to load the application's package manifesr
const manifest = path.join(cwd, 'package.json');

let pkg;

try {
	pkg = require(manifest);
} catch(error) {
	throw new Error(`Could not load package.json from ${cwd}`);
}

// 2. if we have the manifest then find the engine configuration
const runtime = deepGet(pkg, 'x-dash.engine.server');

if (typeof runtime !== 'string') {
	throw new Error('x-engine requires a server runtime engine to be specified');
}

// 3. if this module is a linked dependency then resolve required runtime to CWD
const symlink = __dirname.startsWith(cwd) === false;
const dependency = symlink ? path.join(cwd, 'node_modules', runtime) : runtime;

let engine;

try {
	engine = require(dependency);
} catch (error) {
	// TODO: A friendlier error message
	throw new Error(`Failed to load ${runtime} from ${dependency}`);
}

// 4. if we've loaded the runtime then find it's create element factory function
const factory = typeof engine === 'function' ? engine : (engine.createElement || engine.h);

module.exports = factory;
