import { h, Component, render } from '@financial-times/x-engine';
import { InteractionClass } from './InteractionClass';
import { InteractionRender } from './InteractionRender';
import wrapComponentName from './concerns/wrap-component-name';
import { registerComponent } from './concerns/register-component';

// use the class version for interactive runtimes and the static version for static runtimes
const Interaction = Component ? InteractionClass : InteractionRender;

export const withActions = (getActions) => (Component) => {
	function Enhanced({ id, hydrating, ...initialState }) {
		const actions = typeof getActions === 'function' ? getActions(initialState) : getActions;

		return <Interaction {...{ Component, initialState, actions, id, hydrating }} />;
	}

	wrapComponentName(Component, Enhanced);
	registerComponent(Enhanced);

	return Enhanced;
};

export { default as hydrate } from './Hydrate';
export { getInteractionSerialiser } from './concerns/serialiser';
