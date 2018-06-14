const path = require('path');
const extend = require('./concerns/extend');
const resolvedRequire = require('./concerns/resolved-require');

const resolvePackage = (package) => {
	let dependency;

	try {
		// we have to resolve this relative to the consuming app, not this module!
		dependency = resolvedRequire(`@financial-times/${package}`);
	} catch (error) {
		throw Error(`No installed x-dash package named "${package}" could be found.`);
	}

	return dependency;
};

const resolveLocal = (local) => {
	let dependency;

	try {
		dependency = require(path.join(process.cwd(), local));
	} catch (error) {
		throw Error(`No local module at "${target}" could be found.`);
	}

	return dependency;
};

// This is a regular function expression so that the template context may be shared as "this"
const x = function ({ hash }) {
	let target;

	const mixins = {};

	if (hash.hasOwnProperty('package')) {
		target = resolvePackage(hash.package);
	}

	if (hash.hasOwnProperty('local')) {
		target = resolveLocal(hash.local);
	}

	if (!target) {
		throw Error('You must specify a "package" or "local" dependency to load');
	}

	// TODO: remove this, make the components better!
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
