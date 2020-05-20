import { h } from '@financial-times/x-engine';

export default ({ time }) => {
	return (
		<time
			data-o-component="o-date"
			className="o-date article-info__timestamp"
			itemProp="datePublished"
			data-o-date-format={time.format}
			dateTime={time.iso}>{time.formatted}
		</time>
	);
};
