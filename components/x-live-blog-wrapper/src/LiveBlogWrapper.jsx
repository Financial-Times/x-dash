import { h, Component } from '@financial-times/x-engine'
import { LiveBlogPost } from '@financial-times/x-live-blog-post'
import { withActions } from '@financial-times/x-interaction'
import { normalisePost } from './normalisePost'
import { dispatchEvent } from './dispatchEvent'
import { registerComponent } from '@financial-times/x-interaction'
import { PostTracker } from './lib/post-tracker'

/**
 * @typedef PostTrackerConfig
 * @type {object}
 * @property {Function} onEntersViewport - function to be called when the criteria for `view` in Post tracker has been fulfiled
 * @property {Function} onRead - function to be called when the criteria for `read` in Post tracker has been fulfiled
 * @property {Function} onError - function to be called when PostTracker encounters an error
 * @property {Boolean} usePostTracker - condition checked before creating an instance of post tracker
 */

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

class BaseLiveBlogWrapper extends Component {
	/**
	 * @param {Object} props
	 * @param {Object[]} props.post - A list of liveblog posts
	 * @param {Object} props.ads
	 * @param {string} props.articleUrl - The base url for the article
	 * @param {boolean} props.showShareButtons - condition to show shareButtons
	 * @param {string} props.id - The id of the liveblog package
	 * @param {*} props.liveBlogWrapperElementRef
	 * @param {PostTrackerConfig} props.postTrackerConfig - Optional config for tracking post
	 */
	constructor(props) {
		super(props)
	}

	componentDidUpdate(prevProps) {
		if (this.props.posts && this.props.posts.length && !this.state.tracker) {
			this.setUp()
		}

		if (this.state.tracker && prevProps.posts.length !== this.props.length) {
			this.state.tracker.observeNewElements()
		}
	}

	componentWillUnmount() {
		if (this.state.tracker) {
			this.state.tracker.destroy()
		}
	}

	setUp() {
		const { onEntersViewport, onRead, onError, usePostTracker } = this.props.postTrackerConfig || {}

		if (!usePostTracker) {
			return
		}

		if (
			typeof onEntersViewport !== 'function' ||
			typeof onRead !== 'function' ||
			typeof onError !== 'function'
		) {
			// eslint-disable-next-line no-console
			console.error(
				'onEntersViewport, onRead and onError callback functions are required to use Post tracker'
			)
			return
		}

		const tracker = this.setUpPostTracking({ onEntersViewport, onRead, onError }, this.props.id)
		this.setState({
			tracker
		})
	}

	/**
	 *
	 * @param {Object} callbacks - Callbacks to be called by PostTracker class
	 * @param {Function} callbacks.onEntersViewport - function to be called when the criteria for `view` in Post tracker has been fulfiled
	 * @param {Function} callbacks.onRead - function to be called when the criteria for `read` in Post tracker has been fulfiled
	 * @param {Function} callbacks.onError - function to be called when PostTracker encounters an error
	 * @param {string} id
	 * @returns {PostTracker}
	 */
	setUpPostTracking(callbacks, id) {
		/**
		 * @type {import('./lib/post-tracker').PostTrackerConfig}
		 */
		let config = {
			query: 'article[data-trackable="live-post"]',
			minMillisecondsToReport: 5000,
			returnVisibleElement: true,
			observerUpdateEventString: 'LiveBlogWrapper.INSERT_POST',
			liveBlogWrapperQuery: `div[data-live-blog-wrapper-id="${id}"]`,
			liveBlogWrapper: this.props.liveBlogWrapperElementRef
				? this.props.liveBlogWrapperElementRef.current
				: undefined,
			onEntersViewport: (event) => callbacks.onEntersViewport(event),
			onRead: (event) => callbacks.onRead(event),
			onError: (event) => callbacks.onError(event)
		}

		/**
		 * @type {PostTracker}
		 */
		return new PostTracker(config)
	}

	render() {
		const { posts = [], ads = {}, articleUrl, showShareButtons, id, liveBlogWrapperElementRef } = this.props

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
				renderRichText={this.props.renderRichText}
			/>
		))

		return (
			<div className="x-live-blog-wrapper" data-live-blog-wrapper-id={id} ref={liveBlogWrapperElementRef}>
				{postElements}
			</div>
		)
	}
}

const LiveBlogWrapper = withLiveBlogWrapperActions(BaseLiveBlogWrapper)

// This enables the component to work with x-interaction hydration
registerComponent(LiveBlogWrapper, 'LiveBlogWrapper')

export { LiveBlogWrapper, PostTracker }
