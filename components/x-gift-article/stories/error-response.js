const articleUrl = 'https://www.ft.com/content/blahblahblah';
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`;

exports.title = 'With a bad response from membership APIs';

exports.data = {
	title: 'Share this article (unable to fetch credits)',
	isFreeArticle: false,
	article: {
		id: 'article id',
		url: articleUrl,
		title: 'Title Title Title Title',
	},
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;

exports.fetchMock = fetchMock => {
	fetchMock
		.get(
			'/article-email/credits',
			{
				throw: new Error('bad membership api')
			}
		)
		.get(
			`/article/shorten-url/${ encodeURIComponent(nonGiftArticleUrl) }`,
			{ shortenedUrl: 'https://shortened-non-gift-url' }
		);
};
