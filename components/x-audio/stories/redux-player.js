import buildStory from '../../../.storybook/build-story';
import createAudio from'../';

const cfg = {
	component: createAudio(),

	package: require('../package.json'),

	// Set up basic document styling using the Origami build service
	dependencies: {
		'o-loading': '^3.1.1',
		'o-normalise': '^1.6.0',
		'o-icons': "^5.11.0",
		'o-typography': '^5.11.0',
		'o-colors': "^4.8.5"
	},

	story: {
		title : 'App player (redux)',
		data: {
			expanded: true,
			playing: true,
			loading: false,
			title: 'Notre-Dame fire, Goldman slips, Netflix spend',
			seriesName: 'FT News Briefing',
			onPlayClick: () => {},
			onPauseClick: () => {},
			onCloseClick: () => {}
		}
	},

	knobs: require('./knobs')
};

buildStory(cfg);
