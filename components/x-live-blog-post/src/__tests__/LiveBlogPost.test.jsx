const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { LiveBlogPost } from '../LiveBlogPost';

const breakingNews = {
	postId: '12345',
	title: 'Test',
	content: '<p>Test</p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: true,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
};

const regularPost = {
	postId: '12345',
	title: 'Test title',
	content: '<p><i>Test body</i></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

describe('x-live-blog-post', () => {
	it('renders title', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPost} />);

		expect(liveBlogPost.html()).toContain('Test title');
	});

	it('renders timestamp', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPost} />);

		expect(liveBlogPost.html()).toContain(regularPost.publishedTimestamp);
	});

	it('renders sharing buttons', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPost} />);

		expect(liveBlogPost.html()).toContain('o-share__icon--linkedin');
	});

	it('renders breaking news tag when the post is a breaking news', () => {
		const liveBlogPost = mount(<LiveBlogPost {...breakingNews} />);

		expect(liveBlogPost.html()).toContain('Breaking news');
	});

	it('does not render breaking news tag when the post is not breaking news', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPost} />);

		expect(liveBlogPost.html()).not.toContain('Breaking news');
	});

	it('does not escape content html', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPost} />);

		expect(liveBlogPost.html()).toContain('<p><i>Test body</i></p>');
	});
});
