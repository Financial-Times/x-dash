import { storiesOf } from '@storybook/react';
import * as knobsAddon from '@storybook/addon-knobs/react';

function buildStory (component, knobs, { title, data, story, m }) {
	// The reference to the module is not required, but ensures hot module loading works
	// <https://webpack.js.org/concepts/hot-module-replacement/>
	const storybook = storiesOf(component, m);

	storybook.addDecorator(knobsAddon.withKnobs);

	function createProps(allowedProps = []) {
		const knobProps = knobs(data, knobsAddon);
		const props = Object.assign({}, data, knobProps);

		return allowedProps.reduce((map, prop) => {
			if (props.hasOwnProperty(prop)) {
				const value = props[prop];
				map[prop] = typeof value === 'function' ? value() : value;
			}

			return map;
		}, {});
	}

	storybook.add(title, () => story({ createProps }));

	return storybook;
}

export default buildStory;
