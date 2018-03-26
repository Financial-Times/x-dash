const h = require('@financial-times/x-engine');

module.exports = ({ promotedPrefix, promotedSuffix }) => (
	<div className="o-teaser__meta-promoted">
		<span className="o-teaser__promoted-prefix">{promotedPrefix}</span>
		{' by '}
		<span className="o-teaser__promoted-by">{` ${promotedSuffix} `}</span>
	</div>
);
