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
const props = {
	minSearchLength,
	maxSuggestions,
	apiUrl,
	followedTopics,
};

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
	const apiUrlWithResults = creatApiUrl(searchTerm);
	const apiUrlNoResults = creatApiUrl(searchTermNoResult);
	const apiUrlAllFollowed = creatApiUrl(searchTermAllFollowed);
	const apiResponse = createTopicsData(searchTerm, true);

	fetchMock
	.get(apiUrlWithResults, apiResponse)
	.get(apiUrlNoResults, [])
	.get(apiUrlAllFollowed, []);

	document.body.innerHTML = '<div id="app"></div>';

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
		inputBox.value = null;
		resultContainer = undefined;
	});

	it('should render with input section', () => {
		resultContainer = $(resultContainerClass);
		expect(inputBox).toBeTruthy();
		expect(resultContainer).toBeFalsy();
	})

	it('should not render result if the search term chars is less than minSearchLength', (done) => {
		const wordLessThanMin = searchTerm.slice(0, minSearchLength - 1);
		type(inputBox, wordLessThanMin);

		setTimeout(() => {
			expect(inputBox.value).toEqual(wordLessThanMin);
			resultContainer = $(resultContainerClass);
			expect(resultContainer).toBeFalsy();
			expect(fetchMock.called()).toBeFalsy();
			done();
		}, 1000);
	});

	describe('given searchTerm which has some topic suggestions to follow', () => {

		beforeEach((done) => {
			type(inputBox, searchTerm);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render topics list with follow button', () => {
			expect(inputBox.value).toEqual(searchTerm);
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

		beforeEach((done) => {
			type(inputBox, searchTermNoResult);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render no topic message', () => {
			expect(inputBox.value).toEqual(searchTermNoResult);
			expect(resultContainer).toBeTruthy();
			expect($(resultContainer, 'h2').innerHTML).toMatch('No topics matching');
		});
	});

	describe('given searchTerm which all the topics has been followed', () => {

		beforeEach((done) => {
			type(inputBox, searchTermAllFollowed);

			setTimeout(() => {
				resultContainer = $(resultContainerClass);
				done();
			}, 1000);
		});

		it('should render already followed message with name of the topics', () => {
			expect(inputBox.value).toEqual(searchTermAllFollowed);
			expect(resultContainer).toBeTruthy();
			expect(resultContainer.innerHTML)
				.toMatch(
					`You already follow <span><b>${searchTermAllFollowed} ${suffixes[0]}</b>, </span><span><b>${searchTermAllFollowed} ${suffixes[1]}</b> </span><span>and <b>${searchTermAllFollowed} ${suffixes[2]}</b></span>`
				);
		});

		it('should not render suggestions list', () => {
			const suggestionsList = $$(resultContainer, 'li');
			expect(suggestionsList.length).toBeFalsy();
		});
	});

});
