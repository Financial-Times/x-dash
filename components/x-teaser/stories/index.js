const { Teaser } = require('../');

if (typeof window !== 'undefined' && !/\.ft\.com$/.test(window.location.hostname)) {
	console.warn('Due to CORS restrictions some demos may not work outside of the ft.com domain');
}

exports.component = Teaser;
exports.package = require('../package.json');

exports.dependencies = {
	'o-date': '^v2.11.0',
	'o-fonts': '^3.0.0',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.2.5',
	'o-labels': '^3.0.0',
	'o-video': '^4.1.0',
};

exports.stories = [
	require('./article'),
	require('./opinion'),
	require('./package'),
	require('./promoted'),
	require('./top-story'),
	require('./video'),
];

exports.knobs = require('./knobs');
