const { join } = require('path');
const deepGet = require('./concerns/deep-get');

const manifest = join(process.cwd(), 'package.json');

const pkg = require(manifest);

const runtime = deepGet(pkg, 'x-dash.engine.server');

if (typeof runtime !== 'string') {
	throw new Error('x-engine requires a server runtime engine to be specified');
}

let engine;

try {
	engine = require('./engines/' + runtime);
} catch (error) {
	// TODO: A friendlier error message
	throw new Error(`Failed to load "${runtime}"`);
}

module.exports = engine;
