import React from 'react';
import {configure} from '@storybook/react';
import buildStory from './build-story';

export const loadStories = () => [
	require('../../x-teaser/stories'),
].map(stories => [].concat(stories).map(buildStory));

configure(loadStories, module);
