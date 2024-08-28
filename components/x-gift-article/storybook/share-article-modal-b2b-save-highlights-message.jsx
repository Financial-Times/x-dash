const articleId = 'e4b5ade3-01d1-4db8-b197-257051656684'
const articleUrl = 'https://www.ft.com/content/e4b5ade3-01d1-4db8-b197-257051656684'
const articleUrlRedeemed = 'https://enterprise-sharing.ft.com/gift-url-redeemed'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`

exports.args = {
	title: 'Share this article with:',
	isFreeArticle: false,
	article: {
		id: articleId,
		url: articleUrl,
		title: 'Equinor and Daimler Truck cut Russia ties as Volvo and JLR halt car deliveries'
	},
	id: 'base-gift-article-static-id',
	enterpriseApiBaseUrl: `https://enterprise-sharing-api.ft.com`,
	showHighlightsCheckbox: false,
	showHighlightsRecipientMessage: true
}

exports.fetchMock = (fetchMock) => {
	fetchMock
		.restore()
		.get('path:/article/gift-credits', {
			allowance: 20,
			consumedCredits: 5,
			remainingCredits: 15,
			renewalDate: '2018-08-01T00:00:00Z'
		})
		.get(`path:/article/shorten-url/${encodeURIComponent(articleUrlRedeemed)}`, {
			shortenedUrl: 'https://shortened-gift-url'
		})
		.get(`path:/article/shorten-url/${encodeURIComponent(nonGiftArticleUrl)}`, {
			shortenedUrl: 'https://shortened-non-gift-url'
		})
		.get(`path:/article/gift-link/${encodeURIComponent(articleId)}`, {
			redemptionUrl: articleUrlRedeemed,
			redemptionLimit: 3,
			remainingAllowance: 1
		})
		.get('path:/v1/users/me/allowance', 403)
		.post('path:/v1/shares', {
			url: articleUrlRedeemed,
			redeemLimit: 120
		})
}
