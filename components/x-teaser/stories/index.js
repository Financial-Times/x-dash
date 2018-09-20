const { Teaser } = require('../');

exports.component = Teaser;

exports.package = require('../package.json');

exports.dependencies = {
	'o-normalise': '^1.6.0',
	'o-date': '^2.11.0',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.3.0',
	'o-labels': '^3.0.0',
	'o-video': '^4.1.0',
};

exports.stories = [
	require('./article'),
	require('./opinion'),
	require('./package'),
	require('./package-item'),
	require('./promoted'),
	require('./top-story'),
	require('./video'),
];

exports.knobs = require('./knobs');
