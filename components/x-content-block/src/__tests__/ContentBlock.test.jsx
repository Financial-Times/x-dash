const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { ContentBlock } from '../ContentBlock';

const breakingNews = {
	postId: '12345',
	title: 'Test',
	content: '<p>Test</p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: true,
	articleUrl: 'Https://www.ft.com'
};

const regularPost = {
	postId: '12345',
	title: 'Test',
	content: '<p><i>Test</i></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com'
}

describe('x-content-block', () => {
	it('renders breaking news tag when the post is a breaking news', () => {
		const contentBlock = mount(<ContentBlock {...breakingNews} />);

		expect(contentBlock.html()).toContain('Breaking news');
	});

	it('does not render breaking news tag when the post is not breaking news', () => {
		const contentBlock = mount(<ContentBlock {...regularPost} />);

		expect(contentBlock.html()).not.toContain('Breaking news');
	});

	it('does not escape content html', () => {
		const contentBlock = mount(<ContentBlock {...regularPost} />);

		expect(contentBlock.html()).toContain('<p><i>Test</i></p>');
	});
});
