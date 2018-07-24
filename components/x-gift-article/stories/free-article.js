exports.title = 'Free article';

exports.data = {
	title: 'Share this article (free)',
	isFreeArticle: true,
	articleUrl: 'https://www.ft.com/content/blahblah',
	articleTitle: 'Title Title Title Title',
};

exports.knobs = [
	'title',
	'isFreeArticle',
	'articleUrl',
	'articleTitle'
];

exports.fetchMock = fetchMock => {
	fetchMock
		.restore()
		.get(
			'__myft/api',
			{ 'some': 'response' },
		);
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
