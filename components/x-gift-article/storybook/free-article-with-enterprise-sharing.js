const articleUrl = 'https://www.ft.com/content/blahblahblah'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`
const articleUrlRedeemed = 'https://enterprise-sharing.ft.com/gift-url-redeemed'

exports.args = {
	title: 'Share this article (free)',
	isFreeArticle: true,
	article: {
		title: 'Title Title Title Title',
		id: 'base-gift-article-static-id',
		url: articleUrl
	},
	enterpriseApiBaseUrl: `https://enterprise-sharing-api.ft.com`
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module

exports.fetchMock = (fetchMock) => {
	fetchMock
		.restore()
		.get('/article/gift-credits', {
			allowance: 20,
			consumedCredits: 5,
			remainingCredits: 15,
			renewalDate: '2018-08-01T00:00:00Z'
		})
		.get(`/article/shorten-url/${encodeURIComponent(nonGiftArticleUrl)}`, {
			shortenedUrl: 'https://shortened-non-gift-url'
		})
		.get(`https://enterprise-sharing-api.ft.com/v1/users/me/allowance`, {
			limit: 120,
			hasCredits: true,
			firstTimeUser: false
		})
		.post(`https://enterprise-sharing-api.ft.com/v1/shares`, {
			url: articleUrlRedeemed,
			redeemLimit: 120
		})
}
