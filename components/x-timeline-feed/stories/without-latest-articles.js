exports.title = 'Without latest articles';

exports.data = {
	articles: require('./articles.json'),
	timezoneOffset: -60,
	localTodayDate: '2018-10-17',
	articleActionsCreator: article => `<em data-article-id="${article.id}">(action)</em>`
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
