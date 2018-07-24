const { render } = require('@financial-times/x-engine');
const resolvePeer = require('./concerns/resolve-peer');
const resolveLocal = require('./concerns/resolve-local');

// We're exporting a function in case we need to add options or similar features later
module.exports = () => {
	// Return a regular function expression so that the template context may be shared (this)
	return function({ hash }) {
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

		const type = typeof component;

		if (type !== 'function') {
			throw TypeError(`The included component is not a function, it is of type "${type}"`);
		}

		// "this" is the current Handlebars context
		const props = Object.assign({}, this, mixins, hash);

		return render(component(props));
	};
};
