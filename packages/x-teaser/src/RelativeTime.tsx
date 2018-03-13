import { SFC } from 'react';
import { TeaserProps } from './types/Props';
import { isRecent, getRelativeDate, getStatus } from './concerns/date-time';
import dateformat from 'dateformat';

const displayTime = (date: number): string => {
	const hours = Math.floor(Math.abs(date / 3600000));
	const plural = hours === 1 ? 'hour' : 'hours';
	const suffix = hours === 0 ? '' : `${plural} ago`

	return `${hours} ${suffix}`;
};

// JSX factory function
declare const h: any;

const RelativeTime: SFC<TeaserProps> = ({ publishedDate, firstPublishedDate }) => {
	const relativeDate = getRelativeDate(publishedDate);
	const status = getStatus(publishedDate, firstPublishedDate);

	return isRecent(relativeDate) ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${status}`}>
			{status ? <span className="o-teaser__timestamp-prefix">{status}</span> : null}
			<time
				className="o-teaser__timestamp-date"
				dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime)}>
				{/* Let o-date handle anything < 1 hour */}
				{status ? '' : displayTime(relativeDate)}
			</time>
		</div>
	) : null;
};

export default RelativeTime;
