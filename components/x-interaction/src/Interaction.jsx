import { h } from '@financial-times/x-engine';
import { InteractionClass } from './InteractionClass';
import { InteractionSSR } from './InteractionSSR';
import wrapComponentName from './concerns/wrap-component-name';
import { registerComponent } from './concerns/register-component';

// use the class version for clientside and the static version for server
const Interaction = typeof window !== 'undefined' ? InteractionClass : InteractionSSR;

const invoke = (fnOrObj, ...args) => typeof fnOrObj === 'function'
	? fnOrObj(...args)
	: fnOrObj;

export const withActions = (getActions) => (Component) => {
	const _wraps = { getActions, Component };

	// if the component we're wrapping is already wrapped, we don't want
	// to wrap it further. so, discard its wrapper and rewrap the original
	// component with the new actions on top
	if(Component._wraps) {
		Component = Component._wraps.Component;
		getActions = initialState => Object.assign(
			invoke(Component._wraps.getActions, initialState),
			invoke(_wraps.getActions, initialState)
		);
	}

	function Enhanced({
		id,
		actionsRef,
		serialiser,
		...initialState
	}) {
		const actions = invoke(getActions, initialState);

		return <Interaction {...{
			id,
			Component,
			initialState,
			actionsRef,
			serialiser,
			actions,
		}} />;
	}

	// store what we're wrapping for later wrappers to replace
	Enhanced._wraps = _wraps;

	// set the displayName of the Enhanced component for debugging
	wrapComponentName(Component, Enhanced);

	// register the component under its name for later hydration from serialised data
	registerComponent(Enhanced);

	return Enhanced;
};

export { hydrate } from './Hydrate';
export { HydrationData } from './HydrationData';
export { Serialiser } from './concerns/serialiser';
