import { h } from '@financial-times/x-engine'
import { InteractionClass } from './InteractionClass'
import { InteractionSSR } from './InteractionSSR'
import wrapComponentName from './concerns/wrap-component-name'

// use the class version for clientside and the static version for server
const Interaction = typeof window !== 'undefined' ? InteractionClass : InteractionSSR

const invoke = (fnOrObj, ...args) => (typeof fnOrObj === 'function' ? fnOrObj(...args) : fnOrObj)

export const withActions = (getActions, getDefaultState = {}) => (Component) => {
	const _wraps = { getActions, getDefaultState, Component }

	// if the component we're wrapping is already wrapped, we don't want
	// to wrap it further. so, discard its wrapper and rewrap the original
	// component with the new actions on top
	if (Component._wraps) {
		const wrappedGetActions = Component._wraps.getActions
		const wrappedGetDefaultState = Component._wraps.getDefaultState

		Component = Component._wraps.Component

		getActions = (initialState) =>
			Object.assign(invoke(wrappedGetActions, initialState), invoke(_wraps.getActions, initialState))

		getDefaultState = (initialState) =>
			Object.assign(
				invoke(wrappedGetDefaultState, initialState),
				invoke(_wraps.getDefaultState, initialState)
			)
	}

	function Enhanced({ id, actionsRef, serialiser, ...initialState }) {
		const actions = invoke(getActions, initialState)
		const defaultState = invoke(getDefaultState, initialState)

		return (
			<Interaction
				{...{
					id,
					Component,
					initialState: Object.assign({}, defaultState, initialState),
					actionsRef,
					serialiser,
					actions
				}}
			/>
		)
	}

	// store what we're wrapping for later wrappers to replace
	Enhanced._wraps = _wraps

	// set the displayName of the Enhanced component for debugging
	wrapComponentName(Component, Enhanced)

	return Enhanced
}

export { hydrate } from './Hydrate'
export { HydrationData } from './HydrationData'
export { Serialiser } from './concerns/serialiser'
export { registerComponent, getComponentName } from './concerns/register-component'
