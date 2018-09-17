import { h } from '@financial-times/x-engine';
import getComponentName from './concerns/get-component-name';
import { addSerialisationData } from './concerns/serialiser';
import shortId from '@quarterto/short-id';

import {InteractionRender} from './InteractionRender';

export const InteractionSSR = ({
	initialState,
	Component,
	id = `${getComponentName(Component)}-${shortId()}`,
	actions
}) => {
	addSerialisationData({ id, Component, props: initialState });

	return <div data-x-dash-id={id}>
		<InteractionRender {...{ Component, initialState, id, actions }} />
	</div>;
};
