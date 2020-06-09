import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

// this function extracts time in HH:mm format from publishedTimestamp
function getTimeString(publishedTimestamp) {
	const now = new Date();
	const date = new Date(publishedTimestamp.iso);
	const oneDay = 24 * 60 * 60 * 1000;

	// don't display time string if the post is older than one day
	// because it is already included in the formatted timestamp
	if (now.getTime() - date.getTime() > oneDay) {
		return '';
	}

	// get hours, minutes and seconds into an array
	const parts = date.toLocaleTimeString().split(':');
	// return 'HH:mm'
	return `${parts[0]}:${parts[1]}`;
}

export default ({ publishedTimestamp }) => {
	return (
		<div className={styles['content-block__timestamp-container']}>
			<time
				data-o-component="o-date"
				className={`o-date ${styles['content-block__timestamp']}`}
				itemProp="datePublished"
				data-o-date-format={publishedTimestamp.format}
				dateTime={publishedTimestamp.iso}>{publishedTimestamp.formatted}
			</time>
			<span className={styles['content-block__timestamp-exact-time']}>{getTimeString(publishedTimestamp)}</span>
		</div>
	);
};
