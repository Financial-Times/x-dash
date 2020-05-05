const { LiveblogPost } = require('../src/LiveblogPost');

exports.component = LiveblogPost;

exports.package = require('../package.json');

// Set up basic document styling using the Origami build service
exports.dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0'
};

exports.stories = [
	require('./example')
];

exports.knobs = require('./knobs');
