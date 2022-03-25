const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { LiveBlogPost } from '../LiveBlogPost'

const breakingNewsWordpress = {
	postId: '12345',
	title: 'Test',
	content: '<p>Test</p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: true,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

const regularPostWordpress = {
	postId: '12345',
	title: 'Test title',
	content: '<p><i>Test body</i></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

const breakingNewsSpark = {
	id: '12345',
	title: 'Test',
	byline: 'Test author',
	bodyHTML: '<p>Test</p>',
	publishedTimestamp: new Date().toISOString(),
	standout: {
		breakingNews: true
	},
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

const regularPostSpark = {
	id: '12345',
	title: 'Test title',
	byline: 'Test author',
	bodyHTML: '<p><i>Test body</i></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true
}

const backToTopPostSpark = {
	id: '12345',
	title: 'Test title',
	byline: 'Test author',
	bodyHTML: '<p><i>Test body</i></p>',
	publishedTimestamp: new Date().toISOString(),
	isBreakingNews: false,
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true,
	backToTop: () => {}
}

describe('x-live-blog-post', () => {
	describe('Spark cms', () => {
		describe('title property exists', () => {
			it('renders title', () => {
				const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

				expect(liveBlogPost.html()).toContain('Test title')
				expect(liveBlogPost.html()).toContain('</h2>')
			})
		})

		describe('title property is missing', () => {
			let postWithoutTitle = Object.assign({}, regularPostSpark)

			beforeAll(() => {
				delete postWithoutTitle.title
			})

			it('skips rendering of the title', () => {
				const liveBlogPost = mount(<LiveBlogPost {...postWithoutTitle} />)

				expect(liveBlogPost.html()).not.toContain('</h2>')
			})
		})

		it('renders timestamp', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

			expect(liveBlogPost.html()).toContain(regularPostSpark.publishedTimestamp)
		})

		it('renders byline', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

			expect(liveBlogPost.html()).toContain('Test author')
		})

		it('renders sharing buttons', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

			expect(liveBlogPost.html()).toContain('o-share__icon--linkedin')
		})

		it('renders breaking news tag when the post is a breaking news', () => {
			const liveBlogPost = mount(<LiveBlogPost {...breakingNewsSpark} />)

			expect(liveBlogPost.html()).toContain('Breaking news')
		})

		it('does not render breaking news tag when the post is not breaking news', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

			expect(liveBlogPost.html()).not.toContain('Breaking news')
		})

		it('does not escape content html', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

			expect(liveBlogPost.html()).toContain('<p><i>Test body</i></p>')
		})

		describe('Back to top post', () => {
			it('renders back to top link', () => {
				const liveBlogPost = mount(<LiveBlogPost {...backToTopPostSpark} />)

				expect(liveBlogPost.html()).toContain('Back to top')
				expect(liveBlogPost.html()).toContain('</a>')
			})
		})
	})

	describe('Wordpress cms', () => {
		describe('title property exists', () => {
			it('renders title', () => {
				const liveBlogPost = mount(<LiveBlogPost {...regularPostWordpress} />)

				expect(liveBlogPost.html()).toContain('Test title')
				expect(liveBlogPost.html()).toContain('</h2>')
			})
		})

		describe('title property is missing', () => {
			let postWithoutTitle = Object.assign({}, regularPostWordpress)

			beforeAll(() => {
				delete postWithoutTitle.title
			})

			it('skips rendering of the title', () => {
				const liveBlogPost = mount(<LiveBlogPost {...postWithoutTitle} />)

				expect(liveBlogPost.html()).not.toContain('</h2>')
			})
		})

		it('renders timestamp', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostWordpress} />)

			expect(liveBlogPost.html()).toContain(regularPostWordpress.publishedTimestamp)
		})

		it('renders sharing buttons', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostWordpress} />)

			expect(liveBlogPost.html()).toContain('o-share__icon--linkedin')
		})

		it('renders breaking news tag when the post is a breaking news', () => {
			const liveBlogPost = mount(<LiveBlogPost {...breakingNewsWordpress} />)

			expect(liveBlogPost.html()).toContain('Breaking news')
		})

		it('does not render breaking news tag when the post is not breaking news', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostWordpress} />)

			expect(liveBlogPost.html()).not.toContain('Breaking news')
		})

		it('does not escape content html', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostWordpress} />)

			expect(liveBlogPost.html()).toContain('<p><i>Test body</i></p>')
		})
	})

	it('adds a data-x-component attribute', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

		expect(liveBlogPost.html()).toContain('data-x-component="live-blog-post"')
	})
})
