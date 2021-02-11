import { h, render } from '@financial-times/x-engine'
import { HydrationData } from '../HydrationData'
import { getComponent, getComponentName } from './register-component'

export class Serialiser {
	constructor() {
		this.destroyed = false
		this.data = []
	}

	addData({ id, Component, props }) {
		const registeredComponent = getComponent(Component)

		if (!registeredComponent) {
			throw new Error(
				`a Serialiser's addData was called for an unregistered component. ensure you're registering your component before attempting to output the hydration data`
			)
		}

		if (this.destroyed) {
			throw new Error(
				`an interaction component was rendered after flushHydrationData was called. ensure you're outputting the hydration data after rendering every component`
			)
		}

		this.data.push({
			id,
			component: getComponentName(Component),
			props
		})
	}

	flushHydrationData() {
		if (this.destroyed) {
			throw new Error(
				`a Serialiser's flushHydrationData was called twice. ensure you're not reusing a Serialiser between requests`
			)
		}

		this.destroyed = true
		return this.data
	}

	outputHydrationData() {
		return render(h(HydrationData, { serialiser: this }))
	}
}
