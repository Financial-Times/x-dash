import { h } from '@financial-times/x-engine'
import { getComponentName } from './concerns/register-component'
import shortId from '@quarterto/short-id'

import { InteractionRender } from './InteractionRender'

export const InteractionSSR = ({
	initialState,
	Component,
	id = `${getComponentName(Component)}-${shortId()}`,
	actions,
	serialiser
}) => {
	if (serialiser) {
		serialiser.addData({
			id,
			Component,
			props: initialState
		})
	}

	return (
		<div data-x-dash-id={id}>
			<InteractionRender {...{ Component, initialState, id, actions }} />
		</div>
	)
}
