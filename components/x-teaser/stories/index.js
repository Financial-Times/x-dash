import { Teaser } from '../src/Teaser';

export default {
	component: Teaser,

	package: require('../package.json'),

	dependencies: {
		'o-normalise': '^1.6.0',
		'o-date': '^2.11.0',
		'o-typography': '^5.5.0',
		'o-teaser': '^2.3.0',
		'o-labels': '^3.0.0',
		'o-video': '^4.1.0',
	},

	stories: [
		require('./article'),
		require('./opinion'),
		require('./package'),
		require('./package-item'),
		require('./promoted'),
		require('./top-story'),
		require('./video'),
	],

	knobs: require('./knobs').default,
};
