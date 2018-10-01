import { h } from '@financial-times/x-engine';
import { InteractionClass } from './InteractionClass';
import { InteractionSSR } from './InteractionSSR';
import wrapComponentName from './concerns/wrap-component-name';
import { registerComponent } from './concerns/register-component';

// use the class version for clientside and the static version for server
const Interaction = typeof window !== 'undefined' ? InteractionClass : InteractionSSR;

export const withActions = (getActions) => (Component) => {
	function Enhanced({
		id,
		actions: extraActions,
		actionsRef,
		serialiser,
		...initialState
	}) {
		// support passing actions to withActions as an object or a function
		// that's called with the initial state
		const actions = typeof getActions === 'function'
			? getActions(initialState)
			: getActions;

		return <Interaction {...{
			id,
			Component,
			initialState,
			actionsRef,
			serialiser,
			// if extraActions is defined, those are from another level
			// of wrapping with withActions, so those should take precedence
			actions: Object.assign(actions, extraActions),
		}} />;
	}

	// set the displayName of the Enhanced component for debugging
	wrapComponentName(Component, Enhanced);

	// register the component under its name for later hydration from serialised data
	registerComponent(Enhanced);

	return Enhanced;
};

export { hydrate } from './Hydrate';
export { HydrationData } from './HydrationData';
export { Serialiser } from './concerns/serialiser';
