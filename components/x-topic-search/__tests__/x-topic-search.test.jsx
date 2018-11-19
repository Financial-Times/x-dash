const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { TopicSearch } = require('../');
const fetchMock = require('fetch-mock');

const maxSuggestions = 3;
const searchTerm = 'abc';
const apiUrl = 'api-url';
const apiUrlWithQueries = `${ apiUrl }?count=${ maxSuggestions }&partial=${ searchTerm }`;
const props = { apiUrl, maxSuggestions };

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
			const apiResponse = [
				{ id: 'TOPIC-1__id', prefLabel: 'TOPIC-1__name', url:'TOPIC-1__url' },
				{ id: 'TOPIC-2__id', prefLabel: 'TOPIC-2__name', url:'TOPIC-2__url' }
			];
			fetchMock.get(fetchUrl, apiResponse);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onChange')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

	describe('given there is no topics include search term exist', () => {
		it('should render no topics message', async () => {
			fetchMock.get(fetchUrl, []);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onChange')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

	describe('given all topics include search term are followed', () => {
		it('should render followed topics name list', async () => {
			const followedTopicOne = { name: `${searchTerm}c`, uuid: 'FOLLOWED-TOPIC-1__id' };
			const followedTopicTwo = { name: `${searchTerm}cd`, uuid: 'FOLLOWED-TOPIC-2__id' };
			props.followedTopics = [ followedTopicOne, followedTopicTwo ];

			fetchUrl = `${ apiUrlWithQueries }&tagged=${ followedTopicOne.uuid },${ followedTopicTwo.uuid }`;
			fetchMock.get(fetchUrl, []);

			const subject = mount(<TopicSearch {...props}/>);
			const input = subject.find('input');
			await input.prop('onChange')({ target: { value: searchTerm }});

			expect(subject.render()).toMatchSnapshot();
		})
	});

});
