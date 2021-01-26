import { getComponentName } from './register-component'

function wrapComponentName(Component, Enhanced) {
	const originalDisplayName = getComponentName(Component)
	Enhanced.displayName = `withActions(${originalDisplayName})`
	Enhanced.wrappedDisplayName = originalDisplayName
}

export default wrapComponentName
