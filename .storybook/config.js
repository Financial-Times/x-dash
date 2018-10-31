import { configure } from '@storybook/react';
import buildStory from './build-story';

const requireStories = require.context('../components', true, /stories\/index.js$/);

configure(() => {
   requireStories.keys()
		.map(requireStories)
		.forEach(({ default: { stories, ...data } }) => {
			stories.forEach((story) => buildStory({ story, ...data }));
		});
}, module);
