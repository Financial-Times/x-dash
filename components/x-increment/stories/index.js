const { Increment } = require('../');

exports.component = Increment;
exports.package = require('../package.json');
exports.stories = [
	require('./increment'),
	require('./async'),
];

exports.knobs = require('./knobs');
