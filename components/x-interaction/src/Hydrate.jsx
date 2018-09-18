import { h, render, Component } from '@financial-times/x-engine';
import { getComponent } from './concerns/register-component';

export class HydrationWrapper extends Component {
	render() {
		const {Component, props, id} = this.props;
		return <Component {...props} id={id} actionsRef={a => this.actions = a} />;
	}

	componentDidMount() {
		if(this.props.wrapper) {
			this.props.wrapper.addEventListener('x-interaction.trigger-action', this);
		}
	}

	componentWillUnmount() {
		if(this.props.wrapper) {
			this.props.wrapper.removeEventListener('x-interaction.trigger-action', this);
		}
	}

	handleEvent(event) {
		const {action, args = []} = event.detail;

		if(this.actions && this.actions[action]) {
			this.actions[action](...args);
		}
	}
}

export function hydrate() {
	if (typeof window === 'undefined') {
		throw new Error('x-interaction hydrate should only be called in the browser');
	}

	if (!('_xDashInteractionHydrationData' in window)) {
		throw new Error(
			"x-interaction hydrate was called without hydration data available. this could happen if you called hydrate before the hydration data was defined, or if you're not ouptutting the hydration data in your server-rendered markup."
		);
	}

	window._xDashInteractionHydrationData.forEach(({ id, component, props }) => {
		const wrapper = document.querySelector(`[data-x-dash-id="${id}"]`);
		const Component = getComponent(component);

		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}

		render(<HydrationWrapper {...{
			Component,
			props,
			id,
			wrapper,
		}} />, wrapper);
	});
}
