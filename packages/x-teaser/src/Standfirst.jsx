const h = require('@financial-times/x-engine');

module.exports = ({ standfirst, standfirstVariant, useStandfirstVariant }) => (
	<p className="o-teaser__standfirst">
		{useStandfirstVariant && standfirstVariant ? standfirstVariant : standfirst}
	</p>
);
