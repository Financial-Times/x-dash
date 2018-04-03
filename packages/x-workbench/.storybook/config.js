import React from 'react';
import {configure} from '@storybook/react';
import buildStory from './build-story';
import loadStories from './load-stories';

configure(() => {
	const stories = loadStories();

	for(const component in stories) {
		buildStory(stories[component]);
	}
}, module);
