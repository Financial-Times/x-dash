const registeredComponents = {}
const xInteractionName = Symbol('x-interaction-name')

export function registerComponent(Component, name) {
	if (registeredComponents[name]) {
		throw new Error(
			`x-interaction a component has already been registered under that name, please use another name.`
		)
	}
	Component[xInteractionName] = name
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
