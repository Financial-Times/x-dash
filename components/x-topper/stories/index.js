const { Topper } = require('../');

exports.package = require('../package.json');
exports.component = Topper;
exports.dependencies = {
	'o-topper': '^2.3.0',
	'o-typography': '^5.4.2',
	'o-grid': '^4.3.7',
	'o-colors': '^4.1.5',
	'o-icons': '^5.6.0'
};
exports.stories = [
	require('./basic'),
	require('./full-bleed-image-left')
];

exports.knobs = require('./knobs');
