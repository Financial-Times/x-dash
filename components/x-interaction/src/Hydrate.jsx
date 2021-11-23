import { h, render, Component } from '@financial-times/x-engine'
import { getComponentByName } from './concerns/register-component'

export class HydrationWrapper extends Component {
	render() {
		const { Component, props, id } = this.props
		return <Component {...props} id={id} actionsRef={(a) => (this.actions = a)} />
	}

	componentDidMount() {
		if (this.props.wrapper) {
			this.props.wrapper.addEventListener('x-interaction.trigger-action', this)
		}
	}

	componentWillUnmount() {
		if (this.props.wrapper) {
			this.props.wrapper.removeEventListener('x-interaction.trigger-action', this)
		}
	}

	handleEvent(event) {
		const { action, args = [] } = event.detail

		if (this.actions && this.actions[action]) {
			this.actions[action](...args)
		}
	}
}

export function hydrate() {
	if (typeof window === 'undefined') {
		throw new Error('x-interaction hydrate should only be called in the browser')
	}

	if (!('_xDashInteractionHydrationData' in window)) {
		throw new Error(
			`x-interaction hydrate was called without hydration data available. this can happen if you call hydrate before the serialised data is available, or if you're not including the hydration data with your server-rendered markup.`
		)
	}

	const serialiserOrdering = `make sure you're always outputting the serialiser's data in the same request that the serialiser was created. see https://financial-times.github.io/x-dash/components/x-interaction/#hydrating for more details.`

	window._xDashInteractionHydrationData.forEach(({ id, component, props }) => {
		const wrapper = document.querySelector(`[data-x-dash-id="${id}"]`)

		if (!wrapper) {
			throw new Error(
				`component markup for ${id} was not found on the page. It was expected to be an instance of ${component}. it's likely that this hydration data is from another request. ${serialiserOrdering}`
			)
		}

		const Component = getComponentByName(component)

		if (!Component) {
			throw new Error(
				`x-interaction hydrate was called using unregistered component: ${component}. please verify you're registering your component using x-interaction's registerComponent function before attempting to hydrate.`
			)
		}

		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild)
		}

		render(
			<HydrationWrapper
				{...{
					Component,
					props,
					id,
					wrapper
				}}
			/>,
			wrapper
		)
	})

	document.querySelectorAll('[data-x-dash-id]').forEach((element) => {
		const { xDashId } = element.dataset

		const hasData = window._xDashInteractionHydrationData.some(({ id }) => id === xDashId)

		if (!hasData) {
			throw new Error(
				`found component markup for ${xDashId} without any hydration data. it's likely that its hydration data has been output in another request, or that the component was rendered after the serialisation data was output. ${serialiserOrdering}`
			)
		}
	})
}
