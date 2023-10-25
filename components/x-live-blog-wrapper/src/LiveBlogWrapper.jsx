import { h, Component } from '@financial-times/x-engine'
import { LiveBlogPost } from '@financial-times/x-live-blog-post'
import { withActions, registerComponent } from '@financial-times/x-interaction'
import { normalisePost } from './normalisePost'
import { dispatchEvent } from './dispatchEvent'
import { PostTracker } from './lib/post-tracker'
import { useEffect, useRef } from 'react'
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
	 * @param {string | Function} props.backToTop
	 * @param {truncated} props.truncated - show posts truncated
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

		const postElements = posts.map((post, index) => {
			const livePost = (
				<LiveBlogPost
					key={`live-blog-post-${post.id}`}
					{...post}
					articleUrl={articleUrl}
					showShareButtons={showShareButtons}
					ad={ads[index]}
					renderRichText={this.props.renderRichText}
					backToTop={this.props.backToTop}
				/>
			)
			return this.props.truncated ? (
				<TruncatedPost variant={this.props.truncatedVariant} post={post} key={`live-blog-post-${post.id}`}>{livePost}</TruncatedPost>
			) : (
				livePost
			)
		})

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

function TruncatedPost({post, variant = "variant1", children }) {
	const expand = useRef();
	useEffect(() => {
		
	},[])
	const init = () => {
		expand.current.addEventListener('click',() => {
			trackEvent({
				category: 'post',
				id: post.id,
				action: 'cta:click',
			});
		})
	}
	const trackEvent = (trackingData) => {
			const event = new CustomEvent('oTracking.event', {
				detail: trackingData,
				bubbles: true,
			  })
			  document.body.dispatchEvent(event)
	}

	const getExpandText = () => {
		switch(variant){
			case 'variant1' : 
				return "Read more" ;
			case 'variant2' : 
				return 'Expand post'
			case 'variant3' : 
				return 'Open post'
			default :
				return 'Read more'
		}
	}

	const getCollapseText= () => {
		switch(variant){
			case 'variant1' : 
				return "Read less" ;
			case 'variant2' : 
				return 'Collapse post'
			case 'variant3' : 
				return 'Close post'
			default :
				return 'Read less'
		}
	}
	return (
		<div data-trackable="truncated-post" className="truncated-post">
			<div
				data-o-component="o-expander"
				className="o-expander truncated-post-expander"
				data-o-expander-shrink-to="1"
				data-o-expander-item-selector=".x-live-blog-post > .x-live-blog-post__body > p, .x-live-blog-post > .x-live-blog-post__body > blockquote, .x-live-blog-post > .x-live-blog-post__body > ul > li"
				data-o-expander-collapsed-toggle-text={getExpandText()}
				data-o-expander-expanded-toggle-text={getCollapseText()}>
				<div className="o-expander__content">{children}</div>
				<a
					ref={expand}
					data-trackable="truncated-expand"
					data-trackable-context-variant={variant}
					className="o-expander__toggle o-expander__text--custom">
					<span className="o-expander__visually-hidden">&nbsp;</span>
				</a>
			</div>
		</div>
	)
}
