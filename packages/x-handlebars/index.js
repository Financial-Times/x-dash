const path = require('path');
const extend = require('./concerns/extend');
const resolveFrom = require('resolve-from');

const cache = new Map();

// This is a regular function expression so that the template context may be shared as "this"
const x = function ({ hash }) {
	let moduleId;

	if (hash.hasOwnProperty('package')) {
		moduleId = `@financial-times/${hash.package}`;
	}

	if (hash.hasOwnProperty('local')) {
		moduleId = `./${hash.local}`;
	}

	// Cache resolved module paths so we don't hit the disk every time
	if (!cache.has(moduleId)) {
		cache.set(moduleId, resolveFrom(process.cwd(), moduleId));
	}

	const target = require(cache.get(moduleId));

	// TODO: remove this mixin stuff and make the components more easily configurable!
	const mixins = {};

	if (hash.hasOwnProperty('preset') && target.hasOwnProperty('presets')) {
		Object.assign(mixins, target.presets[hash.preset]);
	}

	const component = hash.hasOwnProperty('component') ? target[hash.component] : target;

	if (typeof component !== 'function') {
		throw Error(`The included component is not a function, it is of type "${typeof component}"`);
	}

	// Clear the helper specific arguments
	const empty = { package: undefined, local: undefined, component: undefined };

	const props = extend({}, this, mixins, hash, empty);

	// "this" is the current Handlebars context
	return component(props);
};

// Export an object so that we can control the helper name and append new helpers if needed
module.exports = { x };
