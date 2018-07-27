exports.title = 'With gift credits';

exports.data = {
	title: 'Share this article (with credit)',
	isFreeArticle: false,
	articleUrl: 'article-url',
	articleTitle: 'Title Title Title Title',
	articleId: 'article id',
	sessionId: 'session id',
	showMobileShareLinks: true
};

exports.knobs = [
	'title',
	'isFreeArticle',
	'articleUrl',
	'articleTitle',
	'articleId',
	'sessionId',
	'showMobileShareLinks'
];

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
					'consumedCredits': 19,
					'remainingCredits': 1,
					'renewalDate': '2018-08-01T00:00:00Z'
				}
			}
		)
		.get(
			'begin:/article/shorten-url/gift',
			{ shortenedUrl: 'https://shortened-gift-url' }
		)
		.get(
			'begin:/article/shorten-url/article',
			{ shortenedUrl: 'https://shortened-non-gift-url' }
		);

	fetchMock
		.post(
			'/article-email/gift-link',
			{
				'redemptionUrl': 'gift-url-redeemed',
				'remainingAllowance': 2
			}
		);
};
