const { StylingDemo } = require('../');

exports.component = StylingDemo;
exports.package = require('../package.json');
exports.stories = [
	require('./styling'),
];
