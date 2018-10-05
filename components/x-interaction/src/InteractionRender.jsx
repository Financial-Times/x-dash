import { h } from '@financial-times/x-engine';

export const InteractionRender = ({
	id,
	actions,
	state,
	initialState,
	inFlight,
	Component,
}) => (
	<Component {...initialState} {...state} {...{ id, actions }} isLoading={inFlight > 0} />
);
