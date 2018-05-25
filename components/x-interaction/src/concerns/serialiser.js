import getComponentName from './get-component-name';

let data = [];
let enableSerialisation = false;

export const addSerialisationData = ({id, Component, props}) => {
	if(enableSerialisation) {
		data.push({
			id,
			component: getComponentName(Component),
			props,
		});
	}
}

export const getInteractionSerialiser = () => {
	enableSerialisation = true;

	return () => {
		try {
			return `<script>window._xDashInteractionHydrationData = ${JSON.stringify(data)};</script>`;
		} finally {
			// clear data for subsequent renders
			data = [];
		}
	};
};
