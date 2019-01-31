const fetchMock = require('fetch-mock');
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { TopicSearch } = require('../');

const searchTerm = 'Dog';
const searchTermNoResult = 'Blobfish';
const searchTermAllFollowed = 'Cat';
const minSearchLength = 3;
const maxSuggestions = 3;
const apiUrl = 'api-url';
const alreadyFollowedTopics = [
	{ uuid: 'Cat-House-id', name: 'Cat House' },
	{ uuid: 'Cat-Food-id', name: 'Cat Food' },
	{ uuid: 'Cat-Toys-id', name: 'Cat Toys' }
];

describe('x-topic-search', () => {
	const buildSearchUrl = term => `${apiUrl}?count=${maxSuggestions}&partial=${term}`;
	const enterSearchTerm = searchTerm => {
		target.find('input').simulate('input', { target: { value: searchTerm }});

		return new Promise(resolve => { setTimeout(resolve, 400); });
	};
	let target;

	beforeEach(() => {
		const props = {
			minSearchLength,
			maxSuggestions,
			apiUrl,
			followedTopicIds: alreadyFollowedTopics.map(topic => topic.uuid),
		};
		target = mount(<TopicSearch {...props} />);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('initial rendering', () => {
		it('should render with input box', () => {
			expect(target.find('input').exists()).toBe(true);
		});

		it('should not display result container', () => {
			expect(target.render().children('div')).toHaveLength(1);
		});
	});

	describe('given inputted text is shorter than minSearchLength', () => {
		const apiUrlWithResults = buildSearchUrl('a');

		fetchMock.get(apiUrlWithResults, []);

		beforeEach(() => {
			return enterSearchTerm('a');
		});

		it('does not make a request to the api or render any result', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(false);
			expect(target.render().children('div')).toHaveLength(1);
		});
	});

	describe('given searchTerm which has some topic suggestions to follow', () => {
		const apiUrlWithResults = buildSearchUrl(searchTerm);
		const unfollowedTopicSuggestions = [
			{ id: 'Dog-House-id', prefLabel: 'Dog House', url: 'Dog-House-url' },
			{ id: 'Dog-Food-id', prefLabel: 'Dog Food', url: 'Dog-Food-url' },
			{ id: 'Dog-Toys-id', prefLabel: 'Dog Toys', url: 'Dog-Toys-url' }
		];

		fetchMock.get(apiUrlWithResults, unfollowedTopicSuggestions);

		beforeEach(() => {
			return enterSearchTerm(searchTerm);
		});

		it('requests the topic suggestions with count set to maxSuggestions', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(true);
		});

		it('renders no more than the max number of suggestions', () => {
			expect(target.render().children('div')).toHaveLength(2);
			expect(target.render().find('li')).toHaveLength(maxSuggestions);
		});

		it('renders links and follow buttons for each suggestion', () => {
			const suggestionsList = target.render().find('li');

			unfollowedTopicSuggestions.forEach((topic, index) => {
				const suggestion = suggestionsList.eq(index);

				expect(suggestion.find('a').text()).toEqual(topic.prefLabel);
				expect(suggestion.find('a').attr('href')).toEqual(topic.url);
				expect(suggestion.find('button')).toHaveLength(1);
			});
		})
	});

	describe('given searchTerm which has no topic suggestions to follow', () => {
		const apiUrlNoResults = buildSearchUrl(searchTermNoResult);

		fetchMock.get(apiUrlNoResults, []);

		beforeEach(() => {
			return enterSearchTerm(searchTermNoResult);
		});

		it('requests from the api and renders the no matching topics message', () => {
			expect(fetchMock.called(apiUrlNoResults)).toBe(true);

			const resultContainer = target.render().children('div').eq(1);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.find('h2').text()).toMatch('No topics matching');
		});
	});

	describe('given searchTerm which results in all suggestions already followed', () => {
		const apiUrlAllFollowed = buildSearchUrl(searchTermAllFollowed);

		fetchMock.get(apiUrlAllFollowed, alreadyFollowedTopics.map(topic => ({
			id: topic.uuid,
			prefLabel: topic.name,
			url: topic.name.replace(' ', '-')
		})));

		beforeEach(() => {
			return enterSearchTerm(searchTermAllFollowed);
		});

		it('requests the suggestions from the api', () => {
			expect(fetchMock.called(apiUrlAllFollowed)).toBe(true);
		});

		it('renders the "already followed" message with names of the topics', () => {
			const resultContainer = target.render().children('div').eq(1);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.text())
				.toMatch(`You already follow ${alreadyFollowedTopics[0].name}, ${alreadyFollowedTopics[1].name} and ${alreadyFollowedTopics[2].name}`);
		});
	});
});
