module.exports = (data, { text, object }) => {
	return {
		headline() { return text('Headline', data.headline, 'Main Text'); },
		standfirst() { return text('Standfirst', data.standfirst, 'Main Text'); },
		mainLink() {
			return object('Main Link', data.mainLink, 'Main Link');
		}
	};
};
