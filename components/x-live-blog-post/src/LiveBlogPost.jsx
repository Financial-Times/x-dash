import { h } from '@financial-times/x-engine'
import ShareButtons from './ShareButtons'
import Timestamp from './Timestamp'
import { Body, Byline } from '@financial-times/cp-content-pipeline-ui'

/**
 * Triggers a page scroll depending on what the type of `backToTop` is.
 * A function will be called onClick.
 * A string with be transformed to a hashed href. e.g  backToTop="top" becomes "#top"
 */
function BackToTop({ backToTop }) {
	if (!backToTop) {
		return null
	}

	if (typeof backToTop === 'string') {
		return (
			<a
				href={backToTop.includes('#') ? backToTop : `#${backToTop}`}
				aria-labelledby="Back to top"
				className="x-live-blog-post-controls__back-to-top-link"
			>
				Back to top
			</a>
		)
	}

	if (typeof backToTop === 'function') {
		return (
			<button
				onClick={backToTop}
				aria-labelledby="Back to top"
				className="x-live-blog-post-controls__back-to-top-button"
			>
				Back to top
			</button>
		)
	}
}

const LiveBlogPost = ({ content, articleUrl, showShareButtons = false, ad, backToTop }) => {
	const showBreakingNewsLabel = content.standout?.breakingNews
	return (
		<article
			className="x-live-blog-post"
			data-trackable="live-post"
			id={`post-${content.id}`}
			data-x-component="live-blog-post"
		>
			<div className="x-live-blog-post__meta">
				<Timestamp publishedTimestamp={content.publishedDate} />
			</div>
			{showBreakingNewsLabel && <div className="x-live-blog-post__breaking-news">Breaking news</div>}
			{content.title && <h2 className="x-live-blog-post__title">{content.title}</h2>}
			{content.byline && <Byline structuredContent={content.byline} />}
			<Body content={content} />
			<div className="x-live-blog-post__controls">
				{showShareButtons && (
					<ShareButtons postId={content.id} articleUrl={articleUrl} title={content.title} />
				)}
				<BackToTop backToTop={backToTop} />
			</div>

			{ad}
		</article>
	)
}

export { LiveBlogPost }
