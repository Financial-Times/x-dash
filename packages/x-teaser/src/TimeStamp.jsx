const h = require('@financial-times/x-engine');
const dateformat = require('dateformat');

module.exports = ({ publishedDate }) => (
	<div className="o-teaser__timestamp">
		<time
			className="o-teaser__timestamp-date"
			datetime={dateformat(publishedDate, dateformat.masks.isoDateTime, true)}>
			{dateformat(publishedDate, dateformat.masks.longDate, true)}
		</time>
	</div>
);
