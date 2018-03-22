const h = require('@financial-times/x-engine');
const dateformat = require('dateformat');

module.exports = ({ publishedDate }) => (
	<div className="o-teaser__timestamp">
		<time
			className="o-teaser__timestamp-date"
			dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime)}>
			{dateformat(publishedDate, dateformat.masks.longDate)}
		</time>
	</div>
);
