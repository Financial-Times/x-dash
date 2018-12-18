const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const keycode = require('keycode');
const fetchMock = require('fetch-mock');

const { TopicSearch } = require('../');

const searchTerm = 'Dog';
const searchTermNoResult = 'Blobfish';
const searchTermAllFollowed = 'Cat';

const suffixes = [ 'House', 'Food', 'Toy' ];

const createTopicsData = (word, apiResponse = false) => {
	return suffixes
		.map((suffix) => {
			const id = `${word}-${suffix}-id`;
			const prefLabel = `${word} ${suffix}`;
			const url = `${word}-${suffix}-url`

			return apiResponse ?
				{ id, prefLabel, url } : { uuid: id, name: prefLabel };
		});
}

const apiUrl = 'api-url';
const maxSuggestions = 3;
const followedTopics = createTopicsData(searchTermAllFollowed);
const props = { apiUrl, maxSuggestions, followedTopics };

const creatApiUrl = (target) => {
	const tagged = followedTopics.map(topic => topic.uuid).join(',');
	return `${ apiUrl }?count=${ maxSuggestions }&partial=${ target }&tagged=${ tagged }`;
};

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

function checkArgs () {
	let target;
	let selector;

	if (arguments.length === 2) {
		target = arguments[0];
		selector = arguments[1];
	} else {
		target = document;
		selector = arguments[0];
	}
	return { target, selector };
}

function $ () {
	const { target, selector } = checkArgs(...arguments);
	return target.querySelector(selector)
}

function $$ () {
	const { target, selector } = checkArgs(...arguments);
  return Array.from(target.querySelectorAll(selector));
}

function key () {
	Array.from(arguments).forEach((value) => {
		TestUtils.Simulate.keyDown($('input'), { value, keyCode: keycode(value), key: value })
	})
}

function type (value) {
	value.split('').forEach((char) => {
		key(char)
		$('input').value += char
		// React calls oninput for every value change to maintain state at all times
		TestUtils.Simulate.input($('input'))
	})
}


describe('x-topic-search', () => {

	afterEach(() => {
		$('input').value = null;
	});

	it('should render with input section', () => {
		const resultContainer = $('.TopicSearch_result-container__34uXy');
		expect($('input')).toBeTruthy();
		expect(resultContainer).toBeFalsy();
	})

	describe('given searchTerm which has some topic suggestions to follow', () => {
		it('should render topics list with follow button', (done) => {
			type(searchTerm);

			setTimeout(() => {
				expect($('input').value).toEqual(searchTerm);

				const resultContainer = $('.TopicSearch_result-container__34uXy');
				expect(resultContainer).toBeTruthy();

				const suggestionsList = $$('li');
				expect(suggestionsList.length).toEqual(maxSuggestions);

				suffixes.forEach((suffix, index) => {
					expect($(suggestionsList[index], 'a').innerHTML).toMatch(`${searchTerm} ${suffix}`);
					expect($(suggestionsList[index], 'a').href).toMatch(`${searchTerm}-${suffix}-url`);
					expect($(suggestionsList[index], 'button')).toBeTruthy();
				});
				done();
			}, 1000);
		});
	});

	describe('given searchTerm which has no topic suggestions to follow', () => {
		it('should render no topic message', (done) => {
			type(searchTermNoResult);

			setTimeout(() => {
				expect($('input').value).toEqual(searchTermNoResult);
				const resultContainer = $('.TopicSearch_result-container__34uXy');
				expect(resultContainer).toBeTruthy();
				expect($(resultContainer, 'h2').innerHTML).toMatch('No topics matching');
				done();
			}, 1000);
		});
	});

	describe('given searchTerm which all the topics has been followed', () => {
		it('should render already followed message with name of the topics', (done) => {
			type(searchTermAllFollowed);

			setTimeout(() => {
				expect($('input').value).toEqual(searchTermAllFollowed);
				const resultContainer = $('.TopicSearch_result-container__34uXy');
				expect(resultContainer).toBeTruthy();
				expect(resultContainer.innerHTML)
				.toMatch(`You already follow <span><b>${searchTermAllFollowed} ${suffixes[0]}</b>, </span><span><b>${searchTermAllFollowed} ${suffixes[1]}</b> </span><span>and <b>${searchTermAllFollowed} ${suffixes[2]}</b></span>`);
				done();
			}, 1000);
		});
	});

});
