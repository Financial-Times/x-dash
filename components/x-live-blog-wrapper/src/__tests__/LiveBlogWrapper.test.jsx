const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

import { LiveBlogWrapper } from '../LiveBlogWrapper';

const post1 = {
	id: '1',
	title: 'Post 1 Title',
	bodyHTML: '<p>Post 1 body</p>',
	publishedDate: new Date().toISOString(),
	isBreakingNews: true,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
};

const post2 = {
	id: '2',
	title: 'Post 2 Title',
	bodyHTML: '<p>Post 2 body</p>',
	publishedDate: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

describe('x-live-blog-wrapper', () => {
	it('renders initial posts', () => {
		const posts = [ post1, post2 ];
		const liveBlogWrapper = mount(<LiveBlogWrapper posts={posts} />);

		expect(liveBlogWrapper.html()).toContain('Post 1 Title');
		expect(liveBlogWrapper.html()).toContain('Post 1 body');
		expect(liveBlogWrapper.html()).toContain('Post 2 Title');
		expect(liveBlogWrapper.html()).toContain('Post 2 body');
	});
});

describe('liveBlogWrapperActions', () => {
	let posts;
	let actions;

	beforeEach(() => {
		posts = [ post1, post2 ];

		// liveBlogActions are not exported from the module, but we can access them via
		// the props of LiveBlogWrapper component.
		const liveBlogWrapper = LiveBlogWrapper({});
		actions = liveBlogWrapper.props.actions;
	});

	it('inserts a new post to the top of the list', () => {
		const post3 = {
			id: '3'
		};

		// insertPost function returns another function that takes the list of component props
		// as an argument and returns the updated props.
		actions.insertPost(post3)({ posts });

		expect(posts.length).toEqual(3);
		expect(posts[0].id).toEqual('3');
	});

	it('updates a post', () => {
		const updatedPost2 = {
			id: '2',
			title: 'Updated title'
		};

		// updatePost function returns another function that takes the list of component props
		// as an argument and returns the updated props.
		actions.updatePost(updatedPost2)({ posts });

		expect(posts.length).toEqual(2);
		expect(posts[1].title).toEqual('Updated title');
	});

	it('deletes a post', () => {
		// deletePost function returns another function that takes the list of component props
		// as an argument and returns the updated props.
		actions.deletePost('1')({ posts });

		expect(posts.length).toEqual(1);
		expect(posts[0].id).toEqual('2');
	});
});
