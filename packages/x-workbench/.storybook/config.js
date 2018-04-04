import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from '../register-components';

configure(() => {
	components.forEach(({ name, component, knobs, stories }) => {
		stories.forEach((story) => buildStory(name, component, knobs, story));
	});
}, module);
