import { h, render } from '@financial-times/x-engine';
import { getComponent } from './concerns/register-component';

function hydrate() {
	if (typeof window === 'undefined') {
		throw new Error('x-interaction hydrate should only be called in the browser');
	}

	if (!('_xDashInteractionHydrationData' in window)) {
		throw new Error(
			"x-interaction hydrate was called without hydration data available. this could happen if you called hydrate before the hydration data was defined, or if you're not ouptutting the hydration data in your server-rendered markup."
		);
	}

	window._xDashInteractionHydrationData.forEach(({ id, component, props }) => {
		const element = document.querySelector(`[data-x-dash-id="${id}"]`);
		const Component = getComponent(component);

		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		render(<Component {...props} id={id} hydrating />, element);
	});
}

export default hydrate;
