module.exports = (data, { text, boolean }) => {
	return {
		title: text('Title', data.title),
		isBreakingNews: boolean('Is breaking news', data.isBreakingNews),
	};
}
