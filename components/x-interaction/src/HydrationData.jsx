import { h } from '@financial-times/x-engine';

export const HydrationData = ({serialiser}) => {
	if(serialiser) {
		const data = serialiser.flushHydrationData();

		return <script dangerouslySetInnerHTML={{__html: `window._xDashInteractionHydrationData = ${JSON.stringify(data)}`}} />;
	}

	return null;
};
