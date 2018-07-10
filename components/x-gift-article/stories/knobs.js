// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { object, text, number, boolean, date, selectV2 }) => {
	return {
		title() {
			return text('Title', data.title);
		}
	}
};
