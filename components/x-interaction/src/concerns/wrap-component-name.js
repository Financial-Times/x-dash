function wrapComponentName(Component, Enhanced) {
	const originalDisplayName = Component.displayName || Component.name
	Enhanced.displayName = `withActions(${originalDisplayName})`
	Enhanced.wrappedDisplayName = originalDisplayName
}

export default wrapComponentName
