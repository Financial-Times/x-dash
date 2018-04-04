import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from '../register-components';

configure(() => {
	components.forEach(({ component, knobs, stories }) => {
		stories.forEach((story) => buildStory(component, knobs, story));
	});
}, module);
