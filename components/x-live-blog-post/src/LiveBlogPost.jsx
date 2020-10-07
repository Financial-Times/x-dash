import { h } from '@financial-times/x-engine';
import ShareButtons from './ShareButtons';
import Timestamp from './Timestamp';
import styles from './LiveBlogPost.scss';

const LiveBlogPost = (props) => {
	const {
		id,
		postId, // Remove once wordpress is no longer in use
		title,
		content, // Remove once wordpress is no longer in use
		bodyHTML,
		publishedTimestamp, // Remove once wordpress is no longer in use
		publishedDate,
		isBreakingNews,
		articleUrl,
		showShareButtons = false,
	} = props;

	return (
		<article className={`live-blog-post ${styles['live-blog-post']}`}
			data-trackable="live-post"
			id={`post-${id || postId}`}
			data-x-component="live-blog-post">
			<div className="live-blog-post__meta">
				<Timestamp publishedTimestamp={publishedDate || publishedTimestamp} />
			</div>
			{isBreakingNews && <div className={styles['live-blog-post__breaking-news']}>Breaking news</div>}
			{title && <h1 className={styles['live-blog-post__title']}>{title}</h1>}
			<div className={`${styles['live-blog-post__body']} n-content-body`} dangerouslySetInnerHTML={{ __html: bodyHTML || content }} />
			{showShareButtons &&
			<ShareButtons postId={id || postId} articleUrl={articleUrl} title={title} />}
		</article>
	);
};

export { LiveBlogPost };
