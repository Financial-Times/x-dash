import h from '@financial-times/x-engine';
import getComponentName from './concerns/get-component-name';
import { loading } from './concerns/symbols';
import { addSerialisationData } from './concerns/serialiser';
import shortId from '@quarterto/short-id';

export const InteractionRender = ({
	actions,
	state,
	initialState,
	Component,
	id = `${getComponentName(Component)}-${shortId()}`,
	hydrating = false,
}) => {
	const {[loading]: isLoading, ...props} = state || initialState;
	addSerialisationData({ id, Component, props });

	const rendered = <Component
		{...props}
		actions={actions}
		isLoading={isLoading}
	/>;

	return hydrating
		? rendered
		: <div data-x-dash-id={id}>{rendered}</div>;
};
