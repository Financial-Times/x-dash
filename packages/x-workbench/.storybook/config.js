import React from 'react';
import {configure} from '@storybook/react';
import buildStory from './build-story';
import loadStories from './load-stories';

configure(() => {
	const components = loadStories();

	for (const component in components) {
		const stories = components[component];

		for (const story in stories) {
			buildStory(stories[story]);
		}
	}
}, module);
