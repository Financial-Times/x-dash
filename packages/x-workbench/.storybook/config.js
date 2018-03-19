import { configure } from '@storybook/react';

function loadStories() {
	require('../components/x-teaser');
}

configure(loadStories, module);
