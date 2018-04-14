import h from '@financial-times/x-engine';

export default ({ title, altTitle, headlineTesting, relativeUrl, url, indicators }) => {
	const displayTitle = headlineTesting && altTitle ? altTitle : title;
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
