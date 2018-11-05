const { GiftArticle } = require('../');

exports.component = GiftArticle;

exports.package = require('../package.json');

exports.dependencies = {
	'o-fonts': '^3.0.0',
	'o-buttons': '^5.13.1',
	'o-forms': '^5.7.3',
	'o-loading': '^2.2.2',
	'o-share': '^6.2.0',
	'o-message': '^2.3.3'
};

exports.stories = [
	require('./with-gift-credits'),
	require('./without-gift-credits'),
	require('./free-article'),
	require('./native-share')
];
