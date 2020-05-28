import { h } from '@financial-times/x-engine';

export default ({ publishedTimestamp }) => {
	return (
		<time
			data-o-component="o-date"
			className="o-date article-info__timestamp"
			itemProp="datePublished"
			data-o-date-format={publishedTimestamp.format}
			dateTime={publishedTimestamp.iso}>{publishedTimestamp.formatted}
		</time>
	);
};
