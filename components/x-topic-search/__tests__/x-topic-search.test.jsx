const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { TopicSearch } = require('../');
const fetchMock = require('fetch-mock');

const maxSuggestions = 3;
const searchTerm = 'abc';
const apiUrl = 'api-url';
const apiUrlWithQueries = `${ apiUrl }?count=${ maxSuggestions }&partial=${ searchTerm }`;
const props = { apiUrl, maxSuggestions };

const topicOne = { id: 'TOPIC-1__id', prefLabel: `${searchTerm}d`, url:'TOPIC-1__url' };
const topicTwo = { id: 'TOPIC-2__id', prefLabel: `${searchTerm}de`, url:'TOPIC-2__url' };
const topicThree = { id: 'TOPIC-3__id', prefLabel: `${searchTerm}def`, url:'TOPIC-3__url' };

describe('x-topic-search', () => {

	let fetchUrl;

	beforeEach(() => {
		fetchUrl = apiUrlWithQueries;
	});

	afterEach(() => {
		fetchMock.restore();
	});

	describe('given there are unfollowed topics include search term', () => {
		it('should render the unfollowed topics list with x-follow-button', async () => {
			fetchMock.get(fetchUrl, [ topicOne, topicTwo]);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onInput')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

	describe('given there is no topics include search term exist', () => {
		it('should render no topics message', async () => {
			fetchMock.get(fetchUrl, []);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onInput')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

	describe('given all topics include search term are followed', () => {
		it('should render followed topics name list', async () => {
			props.followedTopicIds = [ topicOne.id, topicTwo.id, topicThree.id ];

			fetchMock.get(fetchUrl, [ topicOne, topicTwo, topicThree]);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onInput')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

});
