exports.title = 'Without latest articles';

exports.data = {
	articles: require('./content-items.json'),
	timezoneOffset: -60,
	localTodayDate: '2018-10-17',
	articleCustomSlot: article => `<em data-article-id="${article.id}">(action)</em>`
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
