const { ArticleSaveButton } = require('../');

exports.component = ArticleSaveButton;
exports.package = require('../package.json');
exports.knobs = require('./knobs');
exports.dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0'
};
exports.stories = [
	require('./basic')
];
