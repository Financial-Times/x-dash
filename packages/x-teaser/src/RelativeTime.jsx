const h = require('@financial-times/x-engine');
const { isRecent, getRelativeDate, getStatus } = require('./concerns/date-time');
const dateformat = require('dateformat');

/**
 * Display Time
 * @param {Number} date
 * @returns {String}
 */
const displayTime = (date) => {
	const hours = Math.floor(Math.abs(date / 3600000));
	const plural = hours === 1 ? 'hour' : 'hours';
	const suffix = hours === 0 ? '' : `${plural} ago`;

	return `${hours} ${suffix}`;
};

module.exports = ({ publishedDate, firstPublishedDate }) => {
	const relativeDate = getRelativeDate(publishedDate);
	const status = getStatus(publishedDate, firstPublishedDate);

	return isRecent(relativeDate) ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${status}`}>
			{status ? <span className="o-teaser__timestamp-prefix">{status}</span> : null}
			<time
				className="o-teaser__timestamp-date"
				datetime={dateformat(publishedDate, dateformat.masks.isoDateTime, true)}>
				{/* Let o-date handle anything < 1 hour on the client */}
				{status ? '' : displayTime(relativeDate)}
			</time>
		</div>
	) : null;
};
