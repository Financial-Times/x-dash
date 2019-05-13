const { default: buildStory } = require('../../../.storybook/build-story');
const { default: createAudio } = require('../');

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
			expanded: false,
			playing: false,
			title: 'Notre-Dame fire, Goldman slips, Netflix spend',
			seriesName: 'FT News Briefing',
			url: 'https://media.acast.com/ftnewsbriefing/tuesday-may7/media.mp3',
			duration: 600
		}
	},

	knobs: require('./knobs')
};

buildStory(cfg);
