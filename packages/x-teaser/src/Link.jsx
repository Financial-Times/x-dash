const h = require('@financial-times/x-engine');

module.exports = ({ children, url }) => url ? (
	<a
		href={url}
		className="js-teaser-heading-link"
		data-trackable="heading-link"
	>
		{children}
	</a>;
) : (
	<span>{children}</span>
);
