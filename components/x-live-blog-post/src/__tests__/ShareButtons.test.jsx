const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import ShareButtons from '../ShareButtons'

const props = {
	postId: '12345',
	title: 'Test title',
	articleUrl: 'https://www.ft.com'
}

describe('x-live-blog-post', () => {
	describe('ShareButtons', () => {
		it('renders correct twitter url', () => {
			const shareButtons = mount(<ShareButtons {...props} />)
			const twitterButton = shareButtons.find('.o-share__icon--twitter').first()

			expect(twitterButton.prop('href')).toEqual(
				'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.ft.com%2F%23post-12345&text=Test%20title&via=financialtimes'
			)
		})

		it('renders correct facebook url', () => {
			const shareButtons = mount(<ShareButtons {...props} />)
			const facebookButton = shareButtons.find('.o-share__icon--facebook').first()

			expect(facebookButton.prop('href')).toEqual(
				'http://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.ft.com%2F%23post-12345&t=Test%20title'
			)
		})

		it('renders correct linkedin url', () => {
			const shareButtons = mount(<ShareButtons {...props} />)
			const linkedinButton = shareButtons.find('.o-share__icon--linkedin').first()

			expect(linkedinButton.prop('href')).toEqual(
				'http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.ft.com%2F%23post-12345&title=Test%20title&source=Financial+Times'
			)
		})
	})
})
