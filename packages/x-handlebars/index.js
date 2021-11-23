const { h, render } = require('@financial-times/x-engine')
const resolvePeer = require('./concerns/resolve-peer')
const resolveLocal = require('./concerns/resolve-local')

const defaults = {
	baseDirectory: process.cwd()
}

// We're exporting a function in case we need to add options or similar features later
module.exports = (userOptions = {}) => {
	const options = Object.assign({}, defaults, userOptions)

	// Return a regular function expression so that the template context may be shared (this)
	return function ({ hash }) {
		let moduleId

		if (hash.hasOwnProperty('package')) {
			moduleId = resolvePeer(`@financial-times/${hash.package}`)
		}

		if (hash.hasOwnProperty('local')) {
			moduleId = resolveLocal(options.baseDirectory, `./${hash.local}`)
		}

		if (!moduleId) {
			throw new Error('You must specify a "package" or "local" argument to load a component')
		}

		const target = require(moduleId)

		// TODO: remove this mixin stuff and make the components more easily configurable!
		const mixins = {}

		if (hash.hasOwnProperty('preset') && target.hasOwnProperty('presets')) {
			Object.assign(mixins, target.presets[hash.preset])
		}

		const component = hash.hasOwnProperty('component') ? target[hash.component] : target

		const type = typeof component

		if (type !== 'function') {
			throw TypeError(
				`The included component (${hash.component} from ${
					hash.local || hash.package
				}) is not a function, it is of type "${type}"`
			)
		}

		const props = Object.assign({}, this, mixins, hash)

		// Don't allow implementors to pass in the root context when using Express as the "locals" object may include sensitive data.
		// <https://github.com/expressjs/express/blob/0a48e18056865364b2461b2ece7ccb2d1075d3c9/lib/response.js#L1002-L1003>
		if (props.hasOwnProperty('_locals')) {
			throw new Error(
				`The root handlebars context shouldn't be passed to a component, as it may contain sensitive data.`
			)
		}

		return render(h(component, props) || '')
	}
}
