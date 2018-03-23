import {storiesOf} from '@storybook/react';
import * as knobsAddon from '@storybook/addon-knobs/react';
import pick from 'lodash.pick';

function buildStory ({module: m, title, fixture, stories, knobs}) {
	const storybook = storiesOf(title, m);
	storybook.addDecorator(knobsAddon.withKnobs);

	function createProps(allowedProps) {
		const data = pick(fixture, allowedProps);
		const knobProps = knobs(fixture, knobsAddon);

		return Object.assign({}, data, knobProps);
	}

	for(const name in stories) {
		storybook.add(name, () => stories[name]({createProps}));
	}

	return storybook;
}

export default buildStory;
