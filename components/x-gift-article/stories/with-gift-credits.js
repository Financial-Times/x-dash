exports.title = 'With gift credits';

exports.data = {
	title: 'Share this article',
	isFreeArticle: false,
	articleUrl: 'https://www.ft.com/content/blahblah',
	articleTitle: 'Title Title Title Title',
};

exports.knobs = [
	'title',
	'isFreeArticle',
	'articleUrl',
	'articleTitle'
];

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
