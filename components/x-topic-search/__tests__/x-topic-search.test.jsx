const fetchMock = require('fetch-mock')
const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')
const { TopicSearch } = require('../')

const minSearchLength = 3
const maxSuggestions = 3
const apiUrl = 'api-url'
const FOLLOWED_TOPIC_ID1 = 'Cat-House-id'
const FOLLOWED_TOPIC_ID2 = 'Cat-Food-id'
const UNFOLLOWED_TOPIC_ID1 = 'Cat-Toys-id'

describe('x-topic-search', () => {
	const buildSearchUrl = (term) => `${apiUrl}?count=${maxSuggestions}&partial=${term}`
	const enterSearchTerm = (searchTerm) => {
		target.find('input').simulate('input', { target: { value: searchTerm } })

		return new Promise((resolve) => {
			setTimeout(resolve, 400)
		})
	}
	let target

	beforeEach(() => {
		const props = {
			minSearchLength,
			maxSuggestions,
			apiUrl,
			followedTopicIds: [FOLLOWED_TOPIC_ID1, FOLLOWED_TOPIC_ID2]
		}
		target = mount(<TopicSearch {...props} />)
	})

	afterEach(() => {
		fetchMock.reset()
	})

	describe('initial rendering', () => {
		it('should render with input box', () => {
			expect(target.find('input').exists()).toBe(true)
		})

		it('should not display result container', () => {
			expect(target.render().children('div')).toHaveLength(1)
		})
	})

	describe('when input receives focus', () => {
		it('selects the text in the input', () => {
			const selectMock = jest.fn()
			const inputBox = target.find('input')

			inputBox.simulate('blur')
			inputBox.simulate('focus', { target: { select: selectMock } })

			expect(selectMock).toHaveBeenCalledTimes(1)
		})
	})

	describe('given inputted text is shorter than minSearchLength', () => {
		const apiUrlWithResults = buildSearchUrl('a')

		beforeEach(() => {
			fetchMock.get(apiUrlWithResults, [])
			return enterSearchTerm('a')
		})

		it('does not make a request to the api or render any result', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(false)
			expect(target.render().children('div')).toHaveLength(1)
		})
	})

	describe('given searchTerm which has some topic suggestions to follow', () => {
		const apiUrlWithResults = buildSearchUrl('Cat')
		const results = [
			{ id: FOLLOWED_TOPIC_ID1, prefLabel: 'Cat House', url: 'Cat-House-url' },
			{ id: FOLLOWED_TOPIC_ID2, prefLabel: 'Cat Food', url: 'Cat-Food-url' },
			{ id: UNFOLLOWED_TOPIC_ID1, prefLabel: 'Cat Toys', url: 'Cat-Toys-url' }
		]

		beforeEach(() => {
			fetchMock.get(apiUrlWithResults, results)
			return enterSearchTerm('Cat')
		})

		it('requests the topic suggestions with count set to maxSuggestions', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(true)
		})

		it('renders no more than the max number of suggestions', () => {
			expect(target.render().children('div')).toHaveLength(2)
			expect(target.render().find('li')).toHaveLength(maxSuggestions)
		})

		it('renders links and follow buttons for each suggestion', () => {
			const suggestionsList = target.render().find('li')

			results.forEach((topic, index) => {
				const suggestion = suggestionsList.eq(index)

				expect(suggestion.find('a').text()).toEqual(topic.prefLabel)
				expect(suggestion.find('a').attr('href')).toEqual(topic.url)
				expect(suggestion.find('button').text()).toEqual(
					topic.id === UNFOLLOWED_TOPIC_ID1 ? 'Add to myFT' : 'Added'
				)
			})
		})
	})

	describe('given searchTerm which has no topic suggestions to follow', () => {
		const apiUrlNoResults = buildSearchUrl('Dog')

		beforeEach(() => {
			fetchMock.get(apiUrlNoResults, [])
			return enterSearchTerm('Dog')
		})

		it('requests from the api and renders the no matching topics message', () => {
			expect(fetchMock.called(apiUrlNoResults)).toBe(true)

			const resultContainer = target.render().children('div').eq(1)

			expect(resultContainer).toHaveLength(1)
			expect(resultContainer.find('h2').text()).toMatch('No topics matching')
		})
	})
})
