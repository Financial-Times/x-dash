import React from 'react';
import {configure} from '@storybook/react';
import buildStory from './build-story';
import loadStories from './load-stories';

configure(() => {
	loadStories.forEach(stories => [].concat(stories).forEach(buildStory));
}, module);
