const fetchMock = require('fetch-mock');
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

const { TopicSearch } = require('../');

const searchTerm = 'Dog';
const searchTermNoResult = 'Blobfish';
const searchTermAllFollowed = 'Cat';
const suffixes = [ 'House', 'Food', 'Toys' ];
const minSearchLength = 3;
const maxSuggestions = 3;
const apiUrl = 'api-url';
const followedTopics = createTopicsData(searchTermAllFollowed);

function createTopicsData (word, apiResponse = false) {
	return suffixes
		.map((suffix) => {
			const id = `${word}-${suffix}-id`;
			const prefLabel = `${word} ${suffix}`;
			const url = `${word}-${suffix}-url`;

			return apiResponse ?
				{ id, prefLabel, url } : { uuid: id, name: prefLabel };
				// Api Response => { id: Dog-House-id, prefLabel: Dog House, url: Dog-House-url }
				// Followed Topics Data => { uuid: Dog-House-id, name: Dog House }
		});
}

function buildApiUrl (term) {
	const tagged = followedTopics.map(topic => topic.uuid).join(',');

	return `${apiUrl}?count=${maxSuggestions}&partial=${term}&tagged=${tagged}`;
}

describe('x-topic-search', () => {
	const resultContainerSelector = '.TopicSearch_result-container__34uXy';
	let target;

	beforeEach(() => {
		const props = {
			minSearchLength,
			maxSuggestions,
			apiUrl,
			followedTopics,
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
			expect(target.find(resultContainerSelector).exists()).toBe(false);
		});
	});

	describe('given inputted text is shorter than minSearchLength', () => {
		it('should not render result', (done) => {
			const wordLessThanMin = searchTerm.slice(0, minSearchLength - 1);
			const apiUrlWithResults = buildApiUrl(wordLessThanMin);

			fetchMock.get(apiUrlWithResults, []);

			target.find('input').simulate('change', { target: { value: wordLessThanMin }});

			setTimeout(() => {
				expect(fetchMock.called(apiUrlWithResults)).toBe(false);
				expect(target.find(resultContainerSelector).exists()).toBe(false);
				done();
			}, 1000);
		});
	});

	describe('given searchTerm which has some topic suggestions to follow', () => {
		const apiUrlWithResults = buildApiUrl(searchTerm);
		const apiResponse = createTopicsData(searchTerm, true);

		fetchMock.get(apiUrlWithResults, apiResponse);

		beforeEach((done) => {
			target.find('input').simulate('change', { target: { value: searchTerm } });

			setTimeout(() => done(), 1000);
		});

		it('should render topics list with follow button', () => {
			expect(fetchMock.called(apiUrlWithResults)).toBe(true);
			expect(target.render().find(resultContainerSelector)).toHaveLength(1);

			const suggestionsList = target.render().find('li');

			expect(suggestionsList).toHaveLength(maxSuggestions);

			suffixes.forEach((suffix, index) => {
				const suggestion = suggestionsList.eq(index);

				expect(suggestion.find('a').text()).toEqual(`${searchTerm} ${suffix}`);
				expect(suggestion.find('a').attr('href')).toEqual(`${searchTerm}-${suffix}-url`);
				expect(suggestion.find('button')).toHaveLength(1);
			});
		});
	});

	describe('given searchTerm which has no topic suggestions to follow', () => {
		const apiUrlNoResults = buildApiUrl(searchTermNoResult);

		fetchMock.get(apiUrlNoResults, []);

		beforeEach((done) => {
			target.find('input').simulate('change', { target: { value: searchTermNoResult } });

			setTimeout(() => done(), 1000);
		});

		it('should render no topic message', () => {
			expect(fetchMock.called(apiUrlNoResults)).toBe(true);

			const resultContainer = target.render().find(resultContainerSelector);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.find('h2').text()).toMatch('No topics matching');
		});
	});

	describe('given searchTerm which all the topics has been followed', () => {
		const apiUrlAllFollowed = buildApiUrl(searchTermAllFollowed);

		fetchMock.get(apiUrlAllFollowed, []);

		beforeEach((done) => {
			target.find('input').simulate('change', { target: { value: searchTermAllFollowed } });

			setTimeout(() => done(), 1000);
		});

		it('should render already followed message with name of the topics', () => {
			expect(fetchMock.called(apiUrlAllFollowed)).toBe(true);

			const resultContainer = target.render().find(resultContainerSelector);

			expect(resultContainer).toHaveLength(1);
			expect(resultContainer.text())
				.toMatch(
					`You already follow ${searchTermAllFollowed} ${suffixes[0]}, ${searchTermAllFollowed} ${suffixes[1]} and ${searchTermAllFollowed} ${suffixes[2]}`
				);
		});
	});

});
