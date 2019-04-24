import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from './register-components';

configure(() => {
	components.forEach(({ stories, ...data }) => {
		stories.forEach((story) => buildStory({ story, ...data }));
	});
}, module);
