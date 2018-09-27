import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from '../register-components';

// const req = require.context('../../components/stories', true, /^index.js$/);
//
// req.keys().forEach(k => console.log('[ddd]', k));
//
// const components = req.keys().map(path => req(path));

configure(() => {
	components.forEach(({ stories, ...data }) => {
		stories.forEach((story) => buildStory({ story, ...data }));
	});
}, module);
