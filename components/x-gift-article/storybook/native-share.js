const articleId = 'article id'
const articleUrl = 'https://www.ft.com/content/blahblahblah'
const articleUrlRedeemed = 'https://gift-url-redeemed'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`

exports.args = {
	title: 'Share this article (on App)',
	isFreeArticle: false,
	article: {
		id: articleId,
		url: articleUrl,
		title: 'Title Title Title Title'
	},
	nativeShare: true,
	id: 'base-gift-article-static-id'
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module

exports.fetchMock = (fetchMock) => {
	fetchMock
		.restore()
		.get('/article/gift-credits', {
			allowance: 20,
			consumedCredits: 2,
			remainingCredits: 18,
			renewalDate: '2018-08-01T00:00:00Z'
		})
		.get(`/article/shorten-url/${encodeURIComponent(articleUrlRedeemed)}`, {
			shortenedUrl: 'https://shortened-gift-url'
		})
		.get(`/article/shorten-url/${encodeURIComponent(nonGiftArticleUrl)}`, {
			shortenedUrl: 'https://shortened-non-gift-url'
		})
		.get(`/article/gift-link/${encodeURIComponent(articleId)}`, {
			redemptionUrl: articleUrlRedeemed,
			remainingAllowance: 1
		})
}
