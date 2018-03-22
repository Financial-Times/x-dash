const h = require('@financial-times/x-engine');

module.exports = ({ title, alternativeTitle, useAlternativeTitle, url, premium }) => {
	const displayTitle = useAlternativeTitle && alternativeTitle ? alternativeTitle : title;

	return (
		<div className="o-teaser__heading">
			{displayTitle ? (
				<a href={url} className="js-teaser-heading-link" data-trackable="heading-link">
					{displayTitle}
				</a>
			) : null}
			{premium ? (
				<span className="o-labels o-labels--premium" aria-label="Premium content">
					Premium
				</span>
			) : null}
		</div>
	);
};
