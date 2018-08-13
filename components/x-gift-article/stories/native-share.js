const articleUrl = 'https://www.ft.com/content/blahblahblah';
const articleUrlRedeemed = 'https://gift-url-redeemed';

exports.title = 'With native share on App';

exports.data = {
	title: 'Share this article (on App)',
	isFreeArticle: false,
	articleUrl,
	articleTitle: 'Title Title Title Title',
	articleId: 'article id',
	sessionId: 'session id',
	nativeShare: true
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
					'consumedCredits': 2,
					'remainingCredits': 18,
					'renewalDate': '2018-08-01T00:00:00Z'
				}
			}
		)
		.get(
			`/article/shorten-url/${ encodeURIComponent(articleUrlRedeemed) }`,
			{ shortenedUrl: 'https://shortened-gift-url' }
		)
		.get(
			`/article/shorten-url/${ encodeURIComponent(articleUrl) }`,
			{ shortenedUrl: 'https://shortened-non-gift-url' }
		)
		.post(
			'/article-email/gift-link',
			{
				'redemptionUrl': articleUrlRedeemed,
				'remainingAllowance': 1
			}
		);
};
