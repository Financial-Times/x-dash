/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h, Fragment } from '@financial-times/x-engine'
import ShareButtons from './ShareButtons'
import Timestamp from './Timestamp'
import styles from './LiveBlogPost.scss'

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

	let BackToTopComponent

	if (backToTop) {
		if (typeof backToTop === 'string') {
			const processTopRef = (ref) => {
				return ref.includes('#') ? ref : `#${ref}`
			}
			BackToTopComponent = (
				/**
				 * (Ref: LBPC101) The class name `live-blog-post-controls__back-to-top-link` has been added to help consumers
				 * of this component select and override css behaviours if it is required. Due to modularization.
				 * the generated classnames will be differen on different releases so this addition provides a steady
				 * selector for overrides
				 */
				<a
					href={processTopRef(backToTop)}
					aria-labelledby="Back to top"
					className={`live-blog-post-controls__back-to-top-link ${styles['live-blog-post-controls__back-to-top-link']}`}
				>
					Back to top
				</a>
			)
		}

		if (typeof backToTop === 'function') {
			BackToTopComponent = (
				/**
				 * (Ref: LBPC101) Override class name `live-blog-post-controls__back-to-top-button`
				 */
				<button
					onClick={backToTop}
					aria-labelledby="Back to top"
					className={`live-blog-post-controls__back-to-top-button ${styles['live-blog-post-controls__back-to-top-button']}`}
				>
					Back to top
				</button>
			)
		}
	}

	return (
		/**
		 * (Ref: LBPC101) Override class name `live-blog-post`
		 */
		<article
			className={`live-blog-post ${styles['live-blog-post']}`}
			data-trackable="live-post"
			id={`post-${id || postId}`}
			data-x-component="live-blog-post"
		>
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
