const articleUrl = 'https://www.ft.com/content/blahblahblah';

exports.title = 'Free article';

exports.data = {
	title: 'Share this article (free)',
	isFreeArticle: true,
	articleUrl,
	articleTitle: 'Title Title Title Title',
	isCopySupported: true,
	id: 'base-gift-article-static-id'
};

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;

exports.fetchMock = fetchMock => {
	fetchMock
		.get(
			'/article-email/credits',
			{ 'credits':
				{
					'allowance': 20,
					'consumedCredits': 5,
					'remainingCredits': 15,
					'renewalDate': '2018-08-01T00:00:00Z'
				}
			}
		)
		.get(
			`/article/shorten-url/${ encodeURIComponent(articleUrl) }`,
			{ shortenedUrl: 'https://shortened-non-gift-url' }
		);
};
