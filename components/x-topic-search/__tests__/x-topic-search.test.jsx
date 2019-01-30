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
const buildSearchUrl = term => `${apiUrl}?count=${maxSuggestions}&partial=${term}`;

describe('x-topic-search', () => {
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
		it('should not render result', (done) => {
			const wordLessThanMin = searchTerm.slice(0, minSearchLength - 1);
			const apiUrlWithResults = buildSearchUrl(wordLessThanMin);

			fetchMock.get(apiUrlWithResults, []);

			target.find('input').simulate('input', { target: { value: wordLessThanMin }});

			setTimeout(() => {
				expect(fetchMock.called(apiUrlWithResults)).toBe(false);
				expect(target.render().children('div')).toHaveLength(1);
				done();
			}, 500);
		});
	});

	describe('given searchTerm which has some topic suggestions to follow', () => {
		const apiUrlWithResults = buildSearchUrl(searchTerm);
		const topicSuggestions = [
			{ id: 'Dog-House-id', prefLabel: 'Dog House', url: 'Dog-House-url' },
			{ id: 'Dog-Food-id', prefLabel: 'Dog Food', url: 'Dog-Food-url' },
			{ id: 'Dog-Toys-id', prefLabel: 'Dog Toys', url: 'Dog-Toys-url' }
		];

		fetchMock.get(apiUrlWithResults, topicSuggestions);

		beforeEach((done) => {
			target.find('input').simulate('input', { target: { value: searchTerm } });

			setTimeout(() => done(), 500);
		});

		it('should render topics list with follow button', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(true);
			expect(target.render().children('div')).toHaveLength(2);

			const suggestionsList = target.render().find('li');

			expect(suggestionsList).toHaveLength(maxSuggestions);

			topicSuggestions.forEach((topic, index) => {
				const suggestion = suggestionsList.eq(index);

				expect(suggestion.find('a').text()).toEqual(topic.prefLabel);
				expect(suggestion.find('a').attr('href')).toEqual(topic.url);
				expect(suggestion.find('button')).toHaveLength(1);
			});
		});
	});

	describe('given searchTerm which has no topic suggestions to follow', () => {
		const apiUrlNoResults = buildSearchUrl(searchTermNoResult);

		fetchMock.get(apiUrlNoResults, []);

		beforeEach((done) => {
			target.find('input').simulate('input', { target: { value: searchTermNoResult } });

			setTimeout(() => done(), 500);
		});

		it('should render no topic message', () => {
			expect(fetchMock.called(apiUrlNoResults)).toBe(true);

			const resultContainer = target.render().children('div').eq(1);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.find('h2').text()).toMatch('No topics matching');
		});
	});

	describe('given searchTerm which all the topics has been followed', () => {
		const apiUrlAllFollowed = buildSearchUrl(searchTermAllFollowed);

		fetchMock.get(apiUrlAllFollowed, alreadyFollowedTopics.map(topic => ({
			id: topic.uuid,
			prefLabel: topic.name,
			url: topic.name.replace(' ', '-')
		})));

		beforeEach((done) => {
			target.find('input').simulate('input', { target: { value: searchTermAllFollowed } });

			setTimeout(() => done(), 500);
		});

		it('should render already followed message with name of the topics', () => {
			expect(fetchMock.called(apiUrlAllFollowed)).toBe(true);

			const resultContainer = target.render().children('div').eq(1);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.text())
				.toMatch(
					`You already follow ${alreadyFollowedTopics[0].name}, ${alreadyFollowedTopics[1].name} and ${alreadyFollowedTopics[2].name}`
				);
		});
	});

});
