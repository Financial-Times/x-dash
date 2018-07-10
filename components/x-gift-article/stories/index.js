const { GiftArticle } = require('../');

exports.component = GiftArticle;
exports.package = require('../package.json');
exports.dependencies = {
	'o-fonts': '^3.0.0',
};
exports.stories = [
	require('./with-gift-credits')
];
exports.knobs = require('./knobs');
