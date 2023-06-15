const fetchMock = require('fetch-mock')
const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

const { GiftArticle } = require('../dist/GiftArticle.cjs.js')

const articleId = 'article id'
const articleUrl = 'https://www.ft.com/content/blahblahblah'
const articleUrlRedeemed = 'https://gift-url-redeemed'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`

const baseArgs = {
	title: 'Title',
	isFreeArticle: false,
	article: {
		title: 'Article Title Blah Blah Blah',
		id: articleId,
		url: articleUrl
	},
	enterpriseApiBaseUrl: `https://enterprise-sharing-api.ft.com`
}

describe('x-gift-article', () => {
	let actions = {}

	beforeEach(() => {
		actions = {}

		fetchMock
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
				remainingAllowance: 1
			})
			.get('path:/v1/users/me/allowance', {
				limit: 120,
				hasCredits: true,
				firstTimeUser: true
			})
			.post('path:/v1/shares', {
				url: articleUrlRedeemed,
				redeemLimit: 120
			})
	})

	afterEach(() => {
		fetchMock.reset()
	})

	it('displays the article title', async () => {
		const args = {
			...baseArgs
		}

		args.article.title = 'A given test article title'

		const subject = mount(<GiftArticle {...args} />)

		expect(subject.find('h2').text()).toEqual('A given test article title')
	})

	it('should call correct endpoints on activate', async () => {
		mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		// it checks enterprise
		expect(fetchMock.called('https://enterprise-sharing-api.ft.com/v1/users/me/allowance')).toBe(true)
		// it checks gift-credits
		expect(fetchMock.called('/article/gift-credits')).toBe(true)
	})

	it('should call shortenNonGiftUrl and display correct url', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		expect(actions.showNonGiftUrlSection).toBeDefined()
		await actions.showNonGiftUrlSection()

		expect(actions.shortenNonGiftUrl).toBeDefined()
		await actions.shortenNonGiftUrl()

		subject.update()

		const input = subject.find('input#share-link')
		expect(input.prop('value')).toEqual('https://shortened-non-gift-url')
	})

	it('should call createGiftUrl and display correct url', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		expect(actions.createGiftUrl).toBeDefined()
		await actions.createGiftUrl()

		subject.update()

		const input = subject.find('input#share-link')
		expect(input.prop('value')).toEqual('https://shortened-gift-url')
	})

	it('should call createEnterpriseUrl and display correct url', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		expect(actions.createEnterpriseUrl).toBeDefined()
		await actions.createEnterpriseUrl()

		subject.update()

		const input = subject.find('input#share-link')
		expect(input.prop('value')).toEqual('https://gift-url-redeemed')
	})

	it.todo('when no gift-credits are available, a message is shown')

	it.todo('when no enterprise credits are available, a message is shown')

	it.todo('displays the mobile share links when showMobileShareLinks is true')

	it.todo('does not display the mobile share links when showMobileShareLinks is false')
})
