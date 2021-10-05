import { h } from '@financial-times/x-engine'
import { LiveBlogPost } from '@financial-times/x-live-blog-post'
import { withActions } from '@financial-times/x-interaction'
import { normalisePost } from './normalisePost'
import { dispatchEvent } from './dispatchEvent'
import { registerComponent } from '@financial-times/x-interaction'

const withLiveBlogWrapperActions = withActions({
	insertPost(newPost, wrapper) {
		return (props) => {
			const normalisedNewPost = normalisePost(newPost)
			const newPostAlreadyExists = props.posts.find((post) => post.id === normalisedNewPost.id)
			if (!newPostAlreadyExists) {
				props.posts.unshift(normalisedNewPost)
				dispatchEvent(wrapper, 'LiveBlogWrapper.INSERT_POST', { post: normalisedNewPost })
			}

			return props
		}
	}
})

const BaseLiveBlogWrapper = ({
	posts = [],
	ads = [],
	articleUrl,
	showShareButtons,
	id,
	liveBlogWrapperElementRef
}) => {
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

	const postElements = posts.map((post, index) => (
		<LiveBlogPost
			key={`live-blog-post-${post.id}`}
			{...post}
			articleUrl={articleUrl}
			showShareButtons={showShareButtons}
			ad={ads[index]}
		/>
	))

	return (
		<div className="x-live-blog-wrapper" data-live-blog-wrapper-id={id} ref={liveBlogWrapperElementRef}>
			{postElements}
		</div>
	)
}

const LiveBlogWrapper = withLiveBlogWrapperActions(BaseLiveBlogWrapper)

// This enables the component to work with x-interaction hydration
registerComponent(LiveBlogWrapper, 'LiveBlogWrapper')

export { LiveBlogWrapper }
