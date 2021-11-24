import { h, Fragment } from '@financial-times/x-engine'
import ShareButtons from './ShareButtons'
import Timestamp from './Timestamp'
import styles from './LiveBlogPost.scss'

/**
 * Triggers a page scroll depending on what the type of `backToTopProp` is.
 * A function will be called onClick.
 * A string with be transformed to a hashed href. e.g  backToTopProp="top" becomes "#top"
 *
 * @param {(function | string)} backToTopProp
 * @returns
 */
function generateBackToTopComponent(backToTopProp) {
	if (!backToTopProp) {
		return
	}

	if (typeof backToTopProp === 'string') {
		const processTopRef = (ref) => {
			return ref.includes('#') ? ref : `#${ref}`
		}
		return (
			<a
				href={processTopRef(backToTopProp)}
				aria-labelledby="Back to top"
				className={styles['live-blog-post-controls__back-to-top-link']}>
				Back to top
			</a>
		)
	}

	if (typeof backToTopProp === 'function') {
		return (
			<button
				onClick={backToTopProp}
				aria-labelledby="Back to top"
				className={styles['live-blog-post-controls__back-to-top-button']}>
				Back to top
			</button>
		)
	}
}

const LiveBlogPost = (props) => {
	const {
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
	} = props

	const showBreakingNewsLabel = standout.breakingNews || isBreakingNews

	const BackToTopComponent = generateBackToTopComponent(backToTop)

	return (
		<article
			className={`live-blog-post ${styles['live-blog-post']}`}
			data-trackable="live-post"
			id={`post-${id || postId}`}
			data-x-component="live-blog-post">
			<div className="live-blog-post__meta">
				<Timestamp publishedTimestamp={publishedDate || publishedTimestamp} />
			</div>
			{showBreakingNewsLabel && <div className={styles['live-blog-post__breaking-news']}>Breaking news</div>}
			{title && <h2 className={styles['live-blog-post__title']}>{title}</h2>}
			{byline && <p className={styles['live-blog-post__byline']}>{byline}</p>}
			<div
				className={`${styles['live-blog-post__body']} n-content-body article--body`}
				dangerouslySetInnerHTML={{ __html: bodyHTML || content }}
			/>
			<div className={styles['live-blog-post__controls']}>
				{showShareButtons && <ShareButtons postId={id || postId} articleUrl={articleUrl} title={title} />}
				{Boolean(BackToTopComponent) && <Fragment>{BackToTopComponent}</Fragment>}
			</div>

			{ad}
		</article>
	)
}

export { LiveBlogPost }
