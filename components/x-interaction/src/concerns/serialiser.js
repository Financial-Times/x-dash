import { h, render } from '@financial-times/x-engine';
import getComponentName from './get-component-name';
import { HydrationData } from '../HydrationData';

export class Serialiser {
	constructor() {
		this.destroyed = false;
		this.data = [];
	}

	addData({id, Component, props}) {
		if(this.destroyed) {
			throw new Error(`an interaction component was rendered after flushHydrationData was called. ensure you're outputting the hydration data after rendering every component`);
		}

		this.data.push({
			id,
			component: getComponentName(Component),
			props,
		});
	}

	flushHydrationData() {
		if(this.destroyed) {
			throw new Error(`a Serialiser's flushHydrationData was called twice. ensure you're not reusing a Serialiser between requests`);
		}

		this.destroyed = true;
		return this.data;
	}

	outputHydrationData() {
		return render(h(HydrationData, {serialiser: this}));
	}
}
