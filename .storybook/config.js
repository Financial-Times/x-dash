import { configure } from '@storybook/react';
import buildStory from './build-story';
import * as components from './register-components';

configure(() => {
	// We used to use a configuration based technique for defining stories for each component as we
	// wanted to reuse the data in multiple places. We now recommend you define stories in a regular
	// way as defined by the Storybook documentation:
	// <https://storybook.js.org/docs/basics/writing-stories/>
	components.forEach(({ stories, ...data }) => {
		stories.forEach((story) => buildStory({ story, ...data }));
	});

	// Add regular story definitions (i.e. those using storiesOf() directly below)
	require('../components/x-increment/storybook/index.jsx');

	require('../components/x-audio/stories/players.jsx');
}, module);
