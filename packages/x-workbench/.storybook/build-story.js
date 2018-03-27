import {storiesOf} from '@storybook/react';
import * as knobsAddon from '@storybook/addon-knobs/react';

function buildStory ({module: m, title, fixture, stories, knobs}) {
	const storybook = storiesOf(title, m);
	storybook.addDecorator(knobsAddon.withKnobs);

	function createProps(allowedProps = []) {
		const knobProps = knobs(fixture, knobsAddon);
		const props = Object.assign({}, fixture, knobProps);

		return allowedProps.reduce((map, prop) => {
			if (props.hasOwnProperty(prop)) {
				const value = props[prop];
				map[prop] = typeof value === 'function' ? value() : value;
			}

			return map;
		}, {});
	}

	for(const name in stories) {
		storybook.add(name, () => stories[name]({createProps}));
	}

	return storybook;
}

export default buildStory;
