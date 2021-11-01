/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h } from '@financial-times/x-engine'
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
		backToTop,
		topRef
	} = props

	const showBreakingNewsLabel = standout.breakingNews || isBreakingNews

	let backToTopProps = {}

	if (topRef) {
		backToTopProps = {
			...backToTopProps,
			href: topRef
		}
	}

	if (backToTop) {
		backToTopProps = {
			...backToTopProps,
			onClick: backToTop
		}
	}

	return (
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
			<div className={styles['live-blog-post__bottom-controls']}>
				{showShareButtons && <ShareButtons postId={id || postId} articleUrl={articleUrl} title={title} />}
				{(Boolean(backToTop) || Boolean(topRef)) && (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<a
						{...backToTopProps}
						aria-labelledby="Back to top"
						{...backToTopProps}
						className={styles['back-to-top']}
					>
						Back to top
					</a>
				)}
			</div>

			{ad}
		</article>
	)
}

export { LiveBlogPost }
