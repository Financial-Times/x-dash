const h = require('@financial-times/x-engine');

module.exports = ({ standfirst, altStandfirst, headlineTesting }) => {
	const displayStandfirst = headlineTesting && altStandfirst ? altStandfirst : standfirst;
	return displayStandfirst ? <p className="o-teaser__standfirst">{displayStandfirst}</p> : null;
};
