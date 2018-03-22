const h = require('@financial-times/x-engine');

module.exports = ({ standfirst, standfirstVariant, useStandfirstVariant }) => {
	const displayStandfirst = useStandfirstVariant && standfirstVariant ? standfirstVariant : standfirst;
	return displayStandfirst ? <p className="o-teaser__standfirst">{displayStandfirst}</p> : null;
};
