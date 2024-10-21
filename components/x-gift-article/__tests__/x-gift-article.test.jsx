import fetchMock from 'fetch-mock'
import { h } from '@financial-times/x-engine'
import { mount } from '@financial-times/x-test-utils/enzyme'
import { ShareArticleModal } from '../dist/GiftArticle.cjs'

jest.mock('@financial-times/o-share', () => jest.fn())

const articleId = 'article id'
const articleUrl = 'https://www.ft.com/content/blahblahblah'
const articleUrlRedeemed = 'https://gift-url-redeemed'
const nonGiftArticleUrl = `${articleUrl}?shareType=nongift`

const baseArgs = {
	title: 'Share this article with:',
	isFreeArticle: false,
	article: {
		id: articleId,
		url: articleUrl,
		title: 'Equinor and Daimler Truck cut Russia ties as Volvo and JLR halt car deliveries'
	},
	id: 'base-gift-article-static-id',
	enterpriseApiBaseUrl: `https://enterprise-sharing-api.ft.com`,
	highlight:
		'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta.'
}

const trimmedHighlight = baseArgs.highlight.split(' ').slice(0, 30).join(' ')
const expectedHighlightText = `${baseArgs.article.title} - "${trimmedHighlight} ..."`

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
				redemptionLimit: 3,
				remainingAllowance: 1
			})
			.get('path:/v1/users/me/allowance', {
				limit: 120,
				budget: 100,
				hasCredits: true
			})
			.post('path:/v1/shares', {
				url: articleUrlRedeemed,
				redeemLimit: 120
			})
			.post('path:/v1/copy-annotations', {
				annotationsCopyResult: []
			})
	})

	afterEach(() => {
		fetchMock.reset()
	})

	it('should call correct endpoints on activate', async () => {
		mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		// it checks enterprise
		expect(fetchMock.called('https://enterprise-sharing-api.ft.com/v1/users/me/allowance')).toBe(true)
		// it checks gift-credits
		expect(fetchMock.called('/article/gift-credits')).toBe(true)
	})

	it('should call shortenNonGiftUrl and display correct url', async () => {
		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.showNonGiftUrlSection()
		await actions.shortenNonGiftUrl()

		subject.update()

		const input = subject.find('#share-link')
		expect(input.prop('value')).toEqual(expectedHighlightText + '\n\n' + 'https://shortened-non-gift-url')
	})

	it('should call createGiftUrl and display correct url', async () => {
		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.createGiftUrl()

		subject.update()

		const input = subject.find('#share-link')

		expect(input.prop('value')).toEqual(expectedHighlightText + '\n\n' + 'https://shortened-gift-url')
	})

	it('should call createEnterpriseUrl and display correct url', async () => {
		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)
		expect(actions.createEnterpriseUrl).toBeDefined()
		await actions.createEnterpriseUrl()

		subject.update()

		const input = subject.find('#share-link')
		expect(input.prop('value')).toEqual(expectedHighlightText + '\n\n' + 'https://gift-url-redeemed')
	})

	it('when credits are available, an alert is not shown', async () => {
		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		expect(subject.find('#no-credit-alert')).not.toExist()
	})

	it('when the article content has changed since highlights were shared, a message to save highlights is not shown', async () => {
		const args = {
			...baseArgs,
			userIsAHighlightsRecipient: true,
			showAdvancedSharingOptions: true,
			giftCredits: 10,
			monthlyAllowance: 100,
			highlight:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta.'
		}

		// Add a message to the document body to simulate the banner that is shown when the article content has changed.
		// We rely on the presence of this banner to determine whether to show the message to save highlights.
		document.body.innerHTML += '<div class="missing-highlight-message"></div>'

		const subject = mount(<ShareArticleModal {...args} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		// We expect this message to not appear when the article content has changed, as any included highlights are invalidated.
		expect(subject.find({ children: 'save the highlights' })).not.toExist()

		// Clean up the message we added to the document body.
		document.body.removeChild(document.querySelector('.missing-highlight-message'))
	})

	it('when a highlights token is included in the url, a message is shown offering to save highlights', async () => {
		const args = {
			...baseArgs,
			userIsAHighlightsRecipient: true,
			showAdvancedSharingOptions: true,
			giftCredits: 10,
			monthlyAllowance: 100,
			highlight:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta.'
		}

		delete window.location
		window.location = new URL('https://www.example.com?highlights=1234')

		const subject = mount(<ShareArticleModal {...args} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		// We expect this message to not appear when the user has already saved the annotations and we have a record of this in localStorage.
		expect(subject.find({ children: 'save the highlights' })).toExist()
	})

	it('when a highlights token is included in the url, but the user has already saved these annotations, a message to save them is not shown', async () => {
		const args = {
			...baseArgs,
			userIsAHighlightsRecipient: true,
			showAdvancedSharingOptions: true,
			giftCredits: 10,
			monthlyAllowance: 100,
			highlight:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quos, quis quas ad, minima fuga at nemo deleniti hic repellendus totam. Impedit mollitia quam repellat harum. Nostrum sapiente minima soluta.'
		}

		delete window.location
		window.location = new URL('https://www.example.com?highlights=1234')

		localStorage.setItem('savedSharedAnnotations', JSON.stringify(['1234']))

		const subject = mount(<ShareArticleModal {...args} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		// We expect this message to not appear when the user has already saved the annotations and we have a record of this in localStorage.
		expect(subject.find({ children: 'save the highlights' })).not.toExist()
	})

	it('when no credits are available, an alert is shown', async () => {
		fetchMock
			.get(
				'path:/article/gift-credits',
				{
					allowance: 20,
					consumedCredits: 20,
					remainingCredits: 0,
					renewalDate: '2018-08-01T00:00:00Z'
				},
				{ overwriteRoutes: true }
			)
			.get(
				'path:/v1/users/me/allowance',
				{
					limit: 120,
					hasCredits: false
				},
				{ overwriteRoutes: true }
			)

		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		expect(subject.find('#no-credit-alert')).toExist()
	})

	it('displays the social share buttons', async () => {
		const subject = mount(<ShareArticleModal {...baseArgs} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		await actions.showNonGiftUrlSection()
		await actions.shortenNonGiftUrl()

		subject.update()

		expect(subject.find('#social-share-buttons')).toExist()
	})

	it('should display the free article message when isFreeArticle is true', async () => {
		const args = {
			...baseArgs,
			isFreeArticle: true
		}
		const subject = mount(<ShareArticleModal {...args} actionsRef={(a) => Object.assign(actions, a)} />)

		await actions.activate()

		subject.update()

		expect(subject.find('#free-article-alert')).toExist()
		expect(subject.find('#share-with-non-subscribers-checkbox')).not.toExist()
	})
})
