const { PodcastLaunchers } = require('../');

exports.component = PodcastLaunchers;

exports.package = require('../package.json');

// Set up basic document styling using the Origami build service
exports.dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0',
	'o-buttons': '^5.16.6',
	'o-forms': '^6.0.3'
};

exports.stories = [
	require('./example')
];

exports.knobs = require('./knobs');
