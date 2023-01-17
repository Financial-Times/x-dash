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
				className="x-live-blog-post-controls__back-to-top-link"
			>
				Back to top
			</a>
		)
	}

	if (typeof backToTop === 'function') {
		return (
			<button onClick={backToTop} className="x-live-blog-post-controls__back-to-top-button">
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
	bodyHTML, //ElasticSearch
	body, // cp-content-pipeline
	renderRichText: RichText,
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

	let postBody, postByline

	if (body && 'structured' in body && RichText) {
		// Content comes from cp-content-pipeline-api
		postBody = (
			<div className="x-live-blog-post__body n-content-body article--body">
				<RichText structuredContent={body.structured} />
			</div>
		)
	} else {
		// Content comes from next-es or wordpress
		postBody = (
			<div
				className="x-live-blog-post__body n-content-body article--body"
				dangerouslySetInnerHTML={{ __html: bodyHTML || content }}
			/>
		)
	}
	if (byline && typeof byline === 'object' && 'tree' in byline && RichText) {
		postByline = (
			<p className="x-live-blog-post__byline">
				<RichText structuredContent={byline} />
			</p>
		)
	} else if (typeof byline === 'string') {
		postByline = <p className="x-live-blog-post__byline">{byline}</p>
	}
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
			{postByline}
			{postBody}
			<div className="x-live-blog-post__controls">
				{showShareButtons && <ShareButtons postId={id || postId} articleUrl={articleUrl} title={title} />}
				<BackToTop backToTop={backToTop} />
			</div>

			{ad}
		</article>
	)
}

export { LiveBlogPost }
