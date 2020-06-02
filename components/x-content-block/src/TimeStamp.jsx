import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

export default ({ publishedTimestamp }) => {
	return (
		<time
			data-o-component="o-date"
			className={`o-date ${styles['content-block__timestamp']}`}
			itemProp="datePublished"
			data-o-date-format={publishedTimestamp.format}
			dateTime={publishedTimestamp.iso}>{publishedTimestamp.formatted}
		</time>
	);
};
