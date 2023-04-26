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
			.get('/article/gift-credits', {
				allowance: 20,
				consumedCredits: 5,
				remainingCredits: 15,
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
			.get('https://enterprise-sharing-api.ft.com/v1/users/me/allowance', {
				limit: 120,
				hasCredits: true,
				firstTimeUser: true
			})
			.post('https://enterprise-sharing-api.ft.com/v1/shares', {
				url: articleUrlRedeemed,
				redeemLimit: 120
			})
	})

	afterEach(() => {
		fetchMock.reset()
	})

	it('displays the correct title', async () => {
		const args = {
			...baseArgs,
			title: 'A given test title'
		}

		const subject = mount(<GiftArticle {...args} />)

		expect(subject.find('h2').text()).toEqual('A given test title')
	})

	it('displays the mobile share links when showMobileShareLinks is true', async () => {
		const args = {
			...baseArgs,
			showMobileShareLinks: true
		}
		const subject = mount(<GiftArticle {...args} />)

		expect(subject.find('div.x-gift-article-mobile-share-buttons').length).toEqual(1)
	})

	it('does not display the mobile share links when showMobileShareLinks is false', async () => {
		const args = {
			...baseArgs,
			showMobileShareLinks: false
		}
		const subject = mount(<GiftArticle {...args} />)

		expect(subject.find('div.x-gift-article-mobile-share-buttons').length).toEqual(0)
	})

	it('should call correct endpoints on activate', async () => {
		mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		// it checks enterprise
		expect(fetchMock.called('https://enterprise-sharing-api.ft.com/v1/users/me/allowance')).toBe(true)
		// it checks gift-credits
		expect(fetchMock.called('/article/gift-credits')).toBe(true)
	})

	it('should call showGiftUrlSection and show correct html element', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		expect(actions.showGiftUrlSection).toBeDefined()
		await actions.showGiftUrlSection()
		subject.update()

		expect(subject.find('div[data-section-id="giftLink"]')).toHaveLength(1)
	})

	it('should call showEnterpriseUrlSection and show correct html element', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		expect(actions.showEnterpriseUrlSection).toBeDefined()
		await actions.showEnterpriseUrlSection()
		subject.update()

		expect(subject.find('div[data-section-id="enterpriseLink"]')).toHaveLength(1)
	})

	it('enterpriseLink radio button is not shown for non-enterprise users', async () => {
		const args = {
			...baseArgs,
			enterpriseApiBaseUrl: undefined
		}

		const subject = mount(<GiftArticle {...args} actionsRef={(a) => Object.assign(actions, a)} />)

		expect(subject.find('input#enterpriseLink')).toHaveLength(0)
		expect(subject.find('input#giftLink')).toHaveLength(1)
		expect(subject.find('input#nonGiftLink')).toHaveLength(1)
	})

	it('should call showNonGiftUrlSection and show correct html element', async () => {
		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		await actions.activate()

		expect(actions.showNonGiftUrlSection).toBeDefined()
		await actions.showNonGiftUrlSection()

		subject.update()

		expect(subject.find('div[data-section-id="nonGiftLink"]')).toHaveLength(1)
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

	it('when no gift-credits are available, a message is shown', async () => {
		fetchMock.get(
			'/article/gift-credits',
			{
				allowance: 20,
				consumedCredits: 20,
				remainingCredits: 0,
				renewalDate: '2018-08-01T00:00:00Z'
			},
			{ overwriteRoutes: true }
		)

		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		await actions.activate()

		expect(actions.showGiftUrlSection).toBeDefined()
		await actions.showGiftUrlSection()
		subject.update()

		expect(subject.find('input#share-link')).toHaveLength(0)
		expect(
			subject.find('div.x-gift-article-message').text().includes('You’ve used all your gift article credits')
		).toBe(true)
	})

	it('when no enterprise credits are available, a message is shown', async () => {
		fetchMock.get(
			`https://enterprise-sharing-api.ft.com/v1/users/me/allowance`,
			{
				limit: 120,
				hasCredits: false,
				firstTimeUser: false
			},
			{ overwriteRoutes: true }
		)

		const subject = mount(<GiftArticle {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		await actions.activate()

		expect(actions.showEnterpriseUrlSection).toBeDefined()
		await actions.showEnterpriseUrlSection()
		subject.update()

		expect(subject.find('input#share-link')).toHaveLength(0)
		expect(
			subject
				.find('div.x-gift-article-message')
				.text()
				.includes('Your organisation has run out of share credits')
		).toBe(true)
	})
})
