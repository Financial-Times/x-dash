import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';
import dateformat from 'dateformat';

const TimeStamp: Component<TeaserProps> = ({ publishedDate }) => (
	<div className="o-teaser__timestamp">
		<time
			className="o-teaser__timestamp-date"
			dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime)}>
			{dateformat(publishedDate, dateformat.masks.longDate)}
		</time>
	</div>
);

export default TimeStamp;
