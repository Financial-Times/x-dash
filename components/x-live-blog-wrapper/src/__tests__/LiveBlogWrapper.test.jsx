const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { LiveBlogWrapper } from '../LiveBlogWrapper';

const post1 = {
	postId: '1',
	title: 'Post 1 Title',
	content: '<p>Post 1</p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: true,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
};

const post2 = {
	postId: '2',
	title: 'Post 2 Title',
	content: '<p>Post 2></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

describe('x-live-blog-wrapper', () => {
	it('renders initial posts', () => {
		const posts = [ post1, post2 ];
		const liveBlogWrapper = mount(<LiveBlogWrapper posts={posts} />);

		expect(liveBlogWrapper.html()).toContain('Post 1 Title');
		expect(liveBlogWrapper.html()).toContain('Post 2 Title');
	});
});
