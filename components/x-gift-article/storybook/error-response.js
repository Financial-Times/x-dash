const articleUrl = 'https://www.ft.com/content/blahblahblah'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`

exports.args = {
	title: 'Share this article (unable to fetch credits)',
	isFreeArticle: false,
	article: {
		id: 'article id',
		url: articleUrl,
		title: 'Title Title Title Title'
	}
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module

exports.fetchMock = (fetchMock) => {
	fetchMock
		.restore()
		.get('/article/gift-credits', {
			throw: new Error('bad membership api')
		})
		.get(`/article/shorten-url/${encodeURIComponent(nonGiftArticleUrl)}`, {
			shortenedUrl: 'https://shortened-non-gift-url'
		})
}
