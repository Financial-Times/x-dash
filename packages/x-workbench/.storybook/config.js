import React from 'react';
import { configure } from '@storybook/react';
import buildStory from './build-story';
import components from '../';

configure(() => {
	for (const component in components) {
		const stories = components[component];

		for (const story in stories) {
			buildStory(stories[story]);
		}
	}
}, module);
