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
		articleUrl,
		isKeyEvent,
		author
	} = props;

	return (
		<article className="live-post" id={`post-${postId}`} data-trackable="live-post">
			<div className="live-post__meta">
				<span className="live-post__author">{author}</span>
				<TimeStamp publishedTimestamp={publishedTimestamp} />
			</div>
			{isKeyEvent && <span>Key event</span>}
			<h1 className={styles['live-post__title']}>{title}</h1>
			{isBreakingNews && <span>Breaking news!</span>}
			<div className="live-post__contents" dangerouslySetInnerHTML={{ __html: content }} />
			<ShareButtons postId={postId} articleUrl={articleUrl} title={title} />
		</article>
	);
};

export { ContentBlock };
