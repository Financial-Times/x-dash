const path = require('path');
const extend = require('./concerns/extend');
const resolvedRequire = require('./concerns/resolved-require');

// This is a regular function expression so that the template context may be shared as "this"
const x = function ({ hash }) {
	let target;

	if (hash.hasOwnProperty('package')) {
		target = resolvedRequire(`@financial-times/${hash.package}`);
	}

	if (hash.hasOwnProperty('local')) {
		target = require(path.join(process.cwd(), hash.local));
	}

	if (!target) {
		throw Error('You must specify a "package" or "local" dependency to load');
	}

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
	return component(props);
};

// Export an object so that we can control the helper name and append new helpers if needed
module.exports = { x };
