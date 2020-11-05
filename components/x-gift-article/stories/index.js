const { GiftArticle } = require('../')

exports.component = GiftArticle

exports.package = require('../package.json')

exports.dependencies = {
	'o-fonts': '^3.0.0'
}

exports.stories = [
	require('./with-gift-credits'),
	require('./without-gift-credits'),
	require('./with-gift-link'),
	require('./free-article'),
	require('./native-share'),
	require('./error-response')
]
