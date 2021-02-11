const registeredComponents = {}
const xInteractionName = Symbol('x-interaction-name')

export function registerComponent(Component, name) {
	if (registeredComponents[name]) {
		throw new Error(
			`x-interaction a component has already been registered under that name, please use another name.`
		)
	}

	if (!Component._wraps) {
		throw new Error(
			`only x-interaction wrapped components (i.e. the component returned from withActions) can be registered`
		)
	}

	Component[xInteractionName] = name
	// add name to original component so we can access the wrapper from the original
	Component._wraps.Component[xInteractionName] = name
	registeredComponents[name] = Component
}

export function getComponent(Component) {
	const name = Component[xInteractionName]
	return registeredComponents[name]
}

export function getComponentByName(name) {
	return registeredComponents[name]
}

export function getComponentName(Component) {
	return Component[xInteractionName] || 'Unknown'
}
