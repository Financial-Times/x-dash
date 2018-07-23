const { GiftArticle } = require('../');

exports.component = GiftArticle;
exports.package = require('../package.json');
exports.dependencies = {
	'o-fonts': '^3.0.0',
	'o-buttons': '^5.13.1',
	'o-forms': '^5.7.3',
	'o-loading': '^2.2.2'
};
exports.stories = [
	require('./with-gift-credits'),
	require('./free-article')
];
exports.knobs = require('./knobs');