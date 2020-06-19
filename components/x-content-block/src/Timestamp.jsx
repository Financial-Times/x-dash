import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

export default ({ publishedTimestamp }) => {
	const now = new Date();
	const oneDay = 24 * 60 * 60 * 1000;
	const date = new Date(publishedTimestamp);
	const formatted = date.toLocaleString();

	let format;
	let hideExactTime;

	if (now.getTime() - date.getTime() < oneDay) {
		// display published date in 'xx minutes ago' format
		// and render exact time next to it
		format = 'time-ago-no-seconds';
		hideExactTime = false;
	} else {
		// don't display time string if the post is older than one day
		// because it is already included in the formatted timestamp
		format = 'MMM dd, HH:mm';
		hideExactTime = true;
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
			<time
				data-o-component="o-date"
				className={`o-date
					${ styles['content-block__timestamp-exact-time'] }
					${ hideExactTime && styles['content-block__timestamp-exact-time-hidden'] }`}
				itemProp="exactTime"
				data-o-date-format="HH:mm"
				dateTime={publishedTimestamp}>{formatted}
			</time>
		</div>
	);
};
