const h = require('@financial-times/x-engine');

module.exports = ({ standfirst, altStandfirst, useAltStandfirst }) => {
	const displayStandfirst = useAltStandfirst && altStandfirst ? altStandfirst : standfirst;
	return displayStandfirst ? <p className="o-teaser__standfirst">{displayStandfirst}</p> : null;
};
