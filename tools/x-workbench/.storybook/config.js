import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from '../register-components';

configure(() => {
	components.forEach(({ name, component, dependencies, knobs, stories }) => {
		stories.forEach((story) => buildStory(name, dependencies, component, knobs, story));
	});
}, module);
