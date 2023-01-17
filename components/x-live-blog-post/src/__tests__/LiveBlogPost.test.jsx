const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')
const { RichText } = require('@financial-times/cp-content-pipeline-ui')

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

const regularPostContentPipeline = {
	id: '12345',
	title: 'Test title',
	byline: {
		tree: {
			type: 'root',
			children: [
				{
					type: 'element',
					tagName: 'AuthorLink',
					properties: {
						href: 'https://www.ft.com/stream/uuid/533620c9-ef05-4d69-8e1f-a338fba24ee5'
					},
					children: [
						{
							type: 'text',
							value: 'Joshua Franklin'
						}
					]
				},
				{
					type: 'text',
					value: ' in New York'
				}
			]
		}
	},
	body: {
		structured: {
			tree: {
				type: 'root',
				children: [
					{
						type: 'element',
						tagName: 'Paragraph',
						children: [
							{
								type: 'text',
								value: 'structured live blog body'
							}
						]
					}
				]
			}
		}
	},
	publishedDate: new Date().toISOString(),
	articleUrl: 'Https://www.ft.com',
	showShareButtons: true,
	renderRichText: RichText
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

	describe('cp-content-pipeline-api', () => {
		it('renders the title', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostContentPipeline} />)
			expect(liveBlogPost.html()).toContain('Test title')
		})

		it('renders the byline', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostContentPipeline} />)
			expect(liveBlogPost.html()).toContain('Joshua Franklin</a> in New York</p>')
		})

		it('renders the body', () => {
			const liveBlogPost = mount(<LiveBlogPost {...regularPostContentPipeline} />)
			expect(liveBlogPost.html()).toContain('class="x-live-blog-post__body')
			expect(liveBlogPost.html()).toContain('<p>structured live blog body</p>')
		})

		it('handles posts without bylines', () => {
			const postWithoutByline = { ...regularPostContentPipeline, byline: null }
			const liveBlogPost = mount(<LiveBlogPost {...postWithoutByline} />)
			expect(liveBlogPost.html()).toContain('class="x-live-blog-post__body')
			expect(liveBlogPost.html()).toContain('<p>structured live blog body</p>')
		})
	})

	it('adds a data-x-component attribute', () => {
		const liveBlogPost = mount(<LiveBlogPost {...regularPostSpark} />)

		expect(liveBlogPost.html()).toContain('data-x-component="live-blog-post"')
	})
})
