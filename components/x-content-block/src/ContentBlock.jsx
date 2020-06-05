import { h } from '@financial-times/x-engine';
import ShareButtons from './ShareButtons';
import TimeStamp from './TimeStamp';
import styles from './ContentBlock.scss';

const ContentBlock = (props) => {
	const {
		postId,
		title,
		content,
		publishedTimestamp,
		isBreakingNews,
		articleUrl
	} = props;

	return (
		<article className={styles['content-block']} id={`post-${postId}`} data-trackable="live-post">
			<div className="content-block__meta">
				<TimeStamp publishedTimestamp={publishedTimestamp} />
			</div>
			{isBreakingNews && <span className={styles['content-block__breaking-news']}>Breaking news</span>}
			<h1 className={styles['content-block__title']}>{title}</h1>
			<div className={styles['content-block__body']} dangerouslySetInnerHTML={{ __html: content }} />
			<ShareButtons postId={postId} articleUrl={articleUrl} title={title} />
		</article>
	);
};

export { ContentBlock };
