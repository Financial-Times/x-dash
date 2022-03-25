import { h } from '@financial-times/x-engine'
import ShareButtons from './ShareButtons'
import Timestamp from './Timestamp'

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

const LiveBlogPost = ({
	id,
	postId, // Remove once wordpress is no longer in use
	title,
	content, // Remove once wordpress is no longer in use
	bodyHTML,
	publishedTimestamp, // Remove once wordpress is no longer in use
	publishedDate,
	isBreakingNews, // Remove once wordpress is no longer in use
	standout = {},
	articleUrl,
	showShareButtons = false,
	byline,
	ad,
	backToTop
}) => {
	const showBreakingNewsLabel = standout.breakingNews || isBreakingNews

	return (
		<article
			className="x-live-blog-post"
			data-trackable="live-post"
			id={`post-${id || postId}`}
			data-x-component="live-blog-post"
		>
			<div className="x-live-blog-post__meta">
				<Timestamp publishedTimestamp={publishedDate || publishedTimestamp} />
			</div>
			{showBreakingNewsLabel && <div className="x-live-blog-post__breaking-news">Breaking news</div>}
			{title && <h2 className="x-live-blog-post__title">{title}</h2>}
			{byline && <p className="x-live-blog-post__byline">{byline}</p>}
			<div
				className="x-live-blog-post__body n-content-body article--body"
				dangerouslySetInnerHTML={{ __html: bodyHTML || content }}
			/>
			<div className="x-live-blog-post__controls">
				{showShareButtons && <ShareButtons postId={id || postId} articleUrl={articleUrl} title={title} />}
				<BackToTop backToTop={backToTop} />
			</div>

			{ad}
		</article>
	)
}

export { LiveBlogPost }
