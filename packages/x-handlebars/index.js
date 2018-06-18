const { render } = require('@financial-times/x-engine');
const extend = require('./concerns/extend');
const resolvePeer = require('./concerns/resolve-peer');
const resolveLocal = require('./concerns/resolve-local');

// This is a regular function expression so that the template context may be shared as "this"
const x = function ({ hash }) {
	let moduleId;

	if (hash.hasOwnProperty('package')) {
		moduleId = resolvePeer(`@financial-times/${hash.package}`);
	}

	if (hash.hasOwnProperty('local')) {
		moduleId = resolveLocal(`./${hash.local}`);
	}

	if (!moduleId) {
		throw new Error('You must specify a "package" or "local" argument to load a component');
	}

	const target = require(moduleId);

	// TODO: remove this mixin stuff and make the components more easily configurable!
	const mixins = {};

	if (hash.hasOwnProperty('preset') && target.hasOwnProperty('presets')) {
		Object.assign(mixins, target.presets[hash.preset]);
	}

	const component = hash.hasOwnProperty('component') ? target[hash.component] : target;

	if (typeof component !== 'function') {
		throw Error(`The included component is not a function, it is of type "${typeof component}"`);
	}

	const props = extend({}, this, mixins, hash);

	// "this" is the current Handlebars context
	return render(component(props));
};

// Export an object so that we can control the helper name and append new helpers if needed
module.exports = { x };
