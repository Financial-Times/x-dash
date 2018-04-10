const h = require('@financial-times/x-engine');

module.exports = ({ title, alternativeTitle, useAlternativeTitle, relativeUrl, url, indicators }) => {
	const displayTitle = useAlternativeTitle && alternativeTitle ? alternativeTitle : title;
	const displayUrl = relativeUrl || url;

	return (
		<div className="o-teaser__heading">
			{displayTitle ? (
				<a href={displayUrl} className="js-teaser-heading-link" data-trackable="heading-link">
					{` ${displayTitle} `}
				</a>
			) : null}
			{indicators && indicators.accessLevel === 'premium' ? (
				<span className="o-labels o-labels--premium" aria-label="Premium content">
					Premium
				</span>
			) : null}
		</div>
	);
};
