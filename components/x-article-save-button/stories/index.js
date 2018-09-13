const { ArticleSaveButton } = require('../');

exports.component = ArticleSaveButton;
exports.package = require('../package.json');
exports.stories = [
	require('./basic')
];
exports.knobs = require('./knobs');
