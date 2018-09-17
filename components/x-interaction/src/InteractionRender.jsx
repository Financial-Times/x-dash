import { h } from '@financial-times/x-engine';
import { loading } from './concerns/symbols';

export const InteractionRender = ({
	id,
	actions,
	state,
	initialState,
	[loading]: isLoading,
	Component,
}) => (
	<Component {...initialState} {...state} {...{ id, actions, isLoading }} />
);
