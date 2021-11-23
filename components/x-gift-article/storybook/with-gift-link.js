const articleId = 'article id'
const articleUrl = 'https://www.ft.com/content/blahblahblah'
const articleUrlRedeemed = 'https://gift-url-redeemed'

exports.args = {
	title: 'Share this article (with gift link)',
	isFreeArticle: false,
	isGiftUrlCreated: true,
	redemptionLimit: 3,
	article: {
		id: articleId,
		url: articleUrl,
		title: 'Title Title Title Title'
	},
	showMobileShareLinks: true,
	id: 'base-gift-article-static-id'
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module

exports.fetchMock = (fetchMock) => {
	fetchMock.restore().get(`/article/gift-link/${encodeURIComponent(articleId)}`, {
		redemptionUrl: articleUrlRedeemed,
		remainingAllowance: 1
	})
}
