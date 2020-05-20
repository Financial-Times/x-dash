import { h } from '@financial-times/x-engine';
import ShareButtons from './ShareButtons';
import TimeStamp from './TimeStamp';
import styles from './ContentBlock.scss';

const ContentBlock = (props) => {
	// The `authordisplayname` and `keytext` properites are temporary and will eventually be replaced
	const {
		mid,
		title,
		content,
		time,
		isBreakingNews,
		articleUrl,
		keytext,
		authordisplayname
	} = props;

	return (
		<article className="live-post" id={`post-${mid}`} data-trackable="live-post">
			<div className="live-post__meta">
				<span className="live-post__author">{authordisplayname}</span>
				<TimeStamp time={time} />
			</div>
			<strong className="live-post__key-event">{keytext}</strong>
			<h1 className={styles['live-post__title']}>{title}</h1>
			{isBreakingNews && <span>Breaking news!</span>}
			<div className="live-post__contents" dangerouslySetInnerHTML={{ __html: content }} />
			<ShareButtons mid={mid} articleUrl={articleUrl} title={title} />
		</article>
	);
};

export { ContentBlock };
