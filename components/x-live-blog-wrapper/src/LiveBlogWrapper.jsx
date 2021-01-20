import { h } from '@financial-times/x-engine'
import { LiveBlogPost } from '@financial-times/x-live-blog-post'
import { withActions } from '@financial-times/x-interaction'
import { listenToLiveBlogEvents } from './LiveEventListener'
import { dispatchEvent } from './dispatchEvent'

const withLiveBlogWrapperActions = withActions({
	insertPost(newPost) {
		return (props) => {
			// Check if the new post already exists in the page, so we don't end up with duplicates.
			const newPostExists = props.posts.find((post) => post.id === newPost.id)
			if (!newPostExists) {
				props.posts.unshift(newPost)
				dispatchEvent('LiveBlogWrapper.INSERT_POST', { post: newPost })
			}

			return props
		}
	},

	updatePost(updatedPost) {
		return (props) => {
			const index = props.posts.findIndex((post) => post.id === updatedPost.id)
			if (index >= 0) {
				props.posts[index] = updatedPost
				dispatchEvent('LiveBlogWrapper.UPDATE_POST', { post: updatedPost })
			}

			return props
		}
	},

	deletePost(postId) {
		return (props) => {
			const index = props.posts.findIndex((post) => post.id === postId)
			if (index >= 0) {
				props.posts.splice(index, 1)
				dispatchEvent('LiveBlogWrapper.DELETE_POST', { postId })
			}

			return props
		}
	}
})

const BaseLiveBlogWrapper = ({ posts = [], articleUrl, showShareButtons, id, liveBlogWrapperElementRef }) => {
	posts.sort((a, b) => {
		const timestampA = a.publishedDate || a.publishedTimestamp
		const timestampB = b.publishedDate || b.publishedTimestamp

		// Newer posts on top
		if (timestampA > timestampB) {
			return -1
		}

		if (timestampB > timestampA) {
			return 1
		}

		return 0
	})

	const postElements = posts.map((post) => (
		<LiveBlogPost
			key={`live-blog-post-${post.id}`}
			{...post}
			articleUrl={articleUrl}
			showShareButtons={showShareButtons}
		/>
	))

	return (
		<div className="x-live-blog-wrapper" data-live-blog-wrapper-id={id} ref={liveBlogWrapperElementRef}>
			{postElements}
		</div>
	)
}

// A displayName is required for this component
// This enables the component to work with x-interaction
BaseLiveBlogWrapper.displayName = 'BaseLiveBlogWrapper'

const LiveBlogWrapper = withLiveBlogWrapperActions(BaseLiveBlogWrapper)

export { LiveBlogWrapper, listenToLiveBlogEvents }
