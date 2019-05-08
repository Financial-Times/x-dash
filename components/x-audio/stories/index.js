const { Audio } = require('../');

exports.component = Audio;

exports.package = require('../package.json');

// Set up basic document styling using the Origami build service
exports.dependencies = {
	'o-loading': '^3.1.1',
	'o-normalise': '^1.6.0',
	'o-icons': "^5.11.0",
	'o-typography': '^5.11.0',
	'o-colors': "^4.8.5"
};

exports.stories = [
	require('./minimised'),
	require('./expanded')
];


exports.knobs = require('./knobs');