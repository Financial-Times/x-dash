const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { LiveBlogWrapper } from '../LiveBlogWrapper'

import { dispatchEvent } from '../dispatchEvent'
jest.mock('../dispatchEvent')

const post1 = {
	id: '1',
	title: 'Post 1 Title',
	bodyHTML: '<p>Post 1 body</p>',
	publishedDate: '2020-10-09T10:00:00.000Z',
	isBreakingNews: true,
	articleUrl: 'https://www.ft.com',
	showShareButtons: true
}

const post2 = {
	id: '2',
	title: 'Post 2 Title',
	bodyHTML: '<p>Post 2 body</p>',
	publishedDate: '2020-10-09T11:00:00.000Z',
	isBreakingNews: false,
	articleUrl: 'https://www.ft.com',
	showShareButtons: true
}

const ads = {
	1: (
		<div className="o-ads" data-o-ads-name="mid1">
			Ads
		</div>
	)
}

describe('x-live-blog-wrapper', () => {
	it('has a displayName', () => {
		expect(LiveBlogWrapper.displayName).toContain('BaseLiveBlogWrapper')
	})

	it('renders initial posts', () => {
		const posts = [post1, post2]
		const liveBlogWrapper = mount(<LiveBlogWrapper posts={posts} />)

		expect(liveBlogWrapper.html()).toContain('Post 1 Title')
		expect(liveBlogWrapper.html()).toContain('Post 1 body')
		expect(liveBlogWrapper.html()).toContain('Post 2 Title')
		expect(liveBlogWrapper.html()).toContain('Post 2 body')
	})

	it('orders posts by date - new posts on top', () => {
		const posts = [post1, post2]
		const liveBlogWrapper = mount(<LiveBlogWrapper posts={posts} />)

		const articles = liveBlogWrapper.find('article')
		expect(articles.at(0).html()).toContain('Post 2 Title')
		expect(articles.at(1).html()).toContain('Post 1 Title')
	})

	it('renders an ad slot element at the given position', () => {
		const posts = [post1, post2]
		const liveBlogWrapper = mount(<LiveBlogWrapper posts={posts} ads={ads} />)

		const articles = liveBlogWrapper.find('article')
		expect(articles.at(0).html()).not.toContain('Ads')
		expect(articles.at(1).html()).toContain('Ads')
	})
})

describe('liveBlogWrapperActions', () => {
	let posts
	let actions

	beforeEach(() => {
		posts = [post1, post2]

		// liveBlogActions are not exported from the module, but we can access them via
		// the props of LiveBlogWrapper component.
		const liveBlogWrapper = LiveBlogWrapper({})
		actions = liveBlogWrapper.props.actions
	})

	afterEach(() => {
		dispatchEvent.mockReset()
	})

	it('inserts a new post to the top of the list', () => {
		const target = 'target'
		const post3 = {
			id: '3'
		}

		// insertPost function returns another function that takes the list of component props
		// as an argument and returns the updated props.
		actions.insertPost(post3, target)({ posts })

		expect(posts.length).toEqual(3)
		expect(posts[0].id).toEqual('3')

		expect(dispatchEvent).toHaveBeenCalledWith('target', 'LiveBlogWrapper.INSERT_POST', {
			post: post3
		})
	})

	it('does not insert a new post if a duplicate', () => {
		// Clone an existing post to check if gets inserted again.
		const duplicatePost = { ...posts[0] }

		// insertPost function returns another function that takes the list of component props
		// as an argument and returns the updated props.
		actions.insertPost(duplicatePost)({ posts })

		expect(posts.length).toEqual(2)
		expect(posts[0].id).toEqual('1')

		expect(dispatchEvent).not.toHaveBeenCalled()
	})
})
