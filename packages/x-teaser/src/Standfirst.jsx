const h = require('@financial-times/x-engine');

module.exports = ({ standfirst, alternativeStandfirst, useAlternativeStandfirst }) => {
	const displayStandfirst = useAlternativeStandfirst && alternativeStandfirst ? alternativeStandfirst : standfirst;
	return displayStandfirst ? <p className="o-teaser__standfirst">{displayStandfirst}</p> : null;
};
