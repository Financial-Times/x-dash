const registeredComponents = {}

export function registerComponent(component, name) {
	const xInteractionName = Symbol('x-interaction-name')
	component[xInteractionName] = name
	registeredComponents[name] = component
}

export function getComponent(component) {
	const xInteractionSymbol = Object.getOwnPropertySymbols(component).find(
		(key) => key.toString() === `Symbol(x-interaction-name)`
	)
	const name = component[xInteractionSymbol]
	return registeredComponents[name]
}
