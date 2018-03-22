const h = require('@financial-times/x-engine');

module.exports = ({ title, url, premium }) => (
	<div className="o-teaser__heading">
		<a href={url} className="js-teaser-heading-link" data-trackable="heading-link">
			{title}
		</a>
		{premium ? (
			<span className="o-labels o-labels--premium" aria-label="Premium content">
				Premium
			</span>
		) : null}
	</div>
);
