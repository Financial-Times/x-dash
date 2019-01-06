const React = require('react');
const ReactDOM = require('react-dom');
const { $, $$, type } = require('./test-helpers')
const fetchMock = require('fetch-mock');

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
			const url = `${word}-${suffix}-url`

			return apiResponse ?
				{ id, prefLabel, url } : { uuid: id, name: prefLabel };
				// Api Response => { id: Dog-House-id, prefLabel: Dog House, url: Dog-House-url }
				// Followed Topics Data => { uuid: Dog-House-id, name: Dog House }
		});
}

function creatApiUrl (target) {
	const tagged = followedTopics.map(topic => topic.uuid).join(',');
	return `${ apiUrl }?count=${ maxSuggestions }&partial=${ target }&tagged=${ tagged }`;
}

function createTopicSearch () {
	document.body.innerHTML = '<div id="app"></div>';

	const props = {
		minSearchLength,
		maxSuggestions,
		apiUrl,
		followedTopics,
	};

	ReactDOM.render(
		React.createElement(TopicSearch, props),
		document.getElementById('app')
	);
}


describe('x-topic-search', () => {

	createTopicSearch();

	let resultContainer;
	const resultContainerClass = '.TopicSearch_result-container__34uXy';
	const inputBox = $('input');

	afterEach(() => {
		fetchMock.reset();
		inputBox.value = null;
		resultContainer = undefined;
	});

	describe('default', () => {
		it('should render with input box', () => {
			expect(inputBox).toBeTruthy();
		})

		it('should not display result container', () => {
			resultContainer = $(resultContainerClass);
			expect(resultContainer).toBeFalsy();
		})

		it('should not render result if the search term chars is less than minSearchLength', (done) => {
			const wordLessThanMin = searchTerm.slice(0, minSearchLength - 1);
			const apiUrlWithResults = creatApiUrl(wordLessThanMin);
			fetchMock.get(apiUrlWithResults, []);

			type(inputBox, wordLessThanMin);

			setTimeout(() => {
				expect(inputBox.value).toEqual(wordLessThanMin);
				expect(fetchMock.called(apiUrlWithResults)).toBeFalsy();

				resultContainer = $(resultContainerClass);
				expect(resultContainer).toBeFalsy();

				done();
			}, 1000);
		});
	})

	describe('given searchTerm which has some topic suggestions to follow', () => {

		const apiUrlWithResults = creatApiUrl(searchTerm);
		const apiResponse = createTopicsData(searchTerm, true);
		fetchMock.get(apiUrlWithResults, apiResponse)

		beforeEach((done) => {
			type(inputBox, searchTerm);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render topics list with follow button', () => {
			expect(inputBox.value).toEqual(searchTerm);
			expect(fetchMock.called(apiUrlWithResults)).toBeTruthy();
			expect(resultContainer).toBeTruthy();

			const suggestionsList = $$(resultContainer, 'li');
			expect(suggestionsList.length).toEqual(maxSuggestions);

			suffixes.forEach((suffix, index) => {
				expect($(suggestionsList[index], 'a').innerHTML).toMatch(`${searchTerm} ${suffix}`);
				expect($(suggestionsList[index], 'a').href).toMatch(`${searchTerm}-${suffix}-url`);
				expect($(suggestionsList[index], 'button')).toBeTruthy();
			});
		});
	});

	describe('given searchTerm which has no topic suggestions to follow', () => {

		const apiUrlNoResults = creatApiUrl(searchTermNoResult);
		fetchMock.get(apiUrlNoResults, [])

		beforeEach((done) => {
			type(inputBox, searchTermNoResult);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render no topic message', () => {
			expect(inputBox.value).toEqual(searchTermNoResult);
			expect(fetchMock.called(apiUrlNoResults)).toBeTruthy();

			expect(resultContainer).toBeTruthy();
			expect($(resultContainer, 'h2').innerHTML).toMatch('No topics matching');
		});
	});

	describe('given searchTerm which all the topics has been followed', () => {

		const apiUrlAllFollowed = creatApiUrl(searchTermAllFollowed);
		fetchMock.get(apiUrlAllFollowed, []);

		beforeEach((done) => {
			type(inputBox, searchTermAllFollowed);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render already followed message with name of the topics', () => {
			expect(inputBox.value).toEqual(searchTermAllFollowed);
			expect(fetchMock.called(apiUrlAllFollowed)).toBeTruthy();

			expect(resultContainer).toBeTruthy();
			expect(resultContainer.innerHTML)
				.toMatch(
					`You already follow <span><b>${searchTermAllFollowed} ${suffixes[0]}</b>, </span><span><b>${searchTermAllFollowed} ${suffixes[1]}</b> </span><span>and <b>${searchTermAllFollowed} ${suffixes[2]}</b></span>`
				);
		});
	});

});
