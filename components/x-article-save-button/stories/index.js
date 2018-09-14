const { ArticleSaveButton } = require('../');

exports.component = ArticleSaveButton;
exports.package = require('../package.json');
exports.knobs = require('./knobs');
exports.dependencies = {
	'o-fonts': '^3.0.0'
};
exports.stories = [
	require('./basic')
];
