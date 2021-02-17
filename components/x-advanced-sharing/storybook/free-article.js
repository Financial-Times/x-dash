const articleUrl = 'https://www.ft.com/content/blahblahblah'
const nonGiftArticleUrl = `${articleUrl}?shareType=external`

exports.args = {
	userOrganisation: 'IBM',
	isFreeArticle: true,
	article: {
		title: 'Title Title Title Title',
		id: 'base-gift-article-static-id',
		url: articleUrl
	}
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module

exports.fetchMock = (fetchMock) => {
	fetchMock
		.restore()
		.get('/article/gift-credits', {
			credits: {
				allowance: 20,
				consumedCredits: 5,
				remainingCredits: 15,
				renewalDate: '2018-08-01T00:00:00Z'
			}
		})
		.get(`/article/shorten-url/${encodeURIComponent(nonGiftArticleUrl)}`, {
			shortenedUrl: 'https://shortened-non-gift-url'
		})
}
