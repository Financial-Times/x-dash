import { h } from '@financial-times/x-engine';
import ShareButtons from './ShareButtons';
import Timestamp from './Timestamp';
import styles from './LiveBlogPost.scss';

const LiveBlogPost = (props) => {
	const {
		postId,
		title,
		content,
		publishedTimestamp,
		isBreakingNews,
		articleUrl,
		showShareButtons = false,
	} = props;

	return (
		<article className={`live-blog-post ${styles['live-blog-post']}`} data-trackable="live-post" id={`live-blog-post-${postId}`}>
			<div className="live-blog-post__meta">
				<Timestamp publishedTimestamp={publishedTimestamp} />
			</div>
			{isBreakingNews && <div className={styles['live-blog-post__breaking-news']}>Breaking news</div>}
			{title && <h1 className={styles['live-blog-post__title']}>{title}</h1>}
			<div className={styles['live-blog-post__body']} dangerouslySetInnerHTML={{ __html: content }} />
			{showShareButtons &&
			<ShareButtons postId={postId} articleUrl={articleUrl} title={title} />}
		</article>
	);
};

export { LiveBlogPost };
