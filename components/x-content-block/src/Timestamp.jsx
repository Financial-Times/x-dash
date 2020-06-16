import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

// this function extracts time in HH:mm format from a given date
function getTimeString(date) {
	// get hours, minutes and seconds into an array
	const parts = date.toLocaleTimeString().split(':');
	// return 'HH:mm'
	return `${parts[0]}:${parts[1]}`;
}

export default ({ publishedTimestamp }) => {
	const now = new Date();
	const oneDay = 24 * 60 * 60 * 1000;
	const date = new Date(publishedTimestamp);
	const formatted = date.toLocaleString();

	let exactTime;
	let format;

	if (now.getTime() - date.getTime() < oneDay) {
		// display published date in 'xx minutes ago' format
		// and render exact time next to it
		format = 'time-ago-no-seconds';
		exactTime = getTimeString(date);
	} else {
		// don't display time string if the post is older than one day
		// because it is already included in the formatted timestamp
		format = 'MMM dd, HH:mm';
		exactTime = '';
	}

	return (
		<div className={styles['content-block__timestamp-container']}>
			<time
				data-o-component="o-date"
				className={`o-date ${styles['content-block__timestamp']}`}
				itemProp="datePublished"
				data-o-date-format={format}
				dateTime={publishedTimestamp}>{formatted}
			</time>
			<span className={styles['content-block__timestamp-exact-time']}>{exactTime}</span>
		</div>
	);
};
