const { Teaser } = require('../');

if (typeof window !== 'undefined' && !/\.ft\.com$/.test(window.location.hostname)) {
	console.warn('Due to CORS restrictions some demos may not work outside of the ft.com domain');
}

module.exports = {
	name: 'x-teaser',
	component: Teaser,
	dependencies: {
		'o-fonts': '^3.0.0',
		'o-typography': '^5.5.0',
		'o-teaser': '^2.2.5',
		'o-labels': '^3.0.0',
		'o-video': '^4.1.0',
	},
	stories: [
		require('./article'), // { title, data, story, m }
		require('./opinion'),
		require('./promoted'),
		require('./top-story'),
		require('./video')
	],
	knobs: require('./knobs')
};
