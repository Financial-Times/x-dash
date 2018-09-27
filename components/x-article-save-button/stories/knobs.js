module.exports = (data, { text, boolean }) => {

	const Groups = {
		Form: 'Form',
		Content: 'Content'
	};

	return {
		csrfToken: text('CSRF token', data.csrfToken, Groups.Form),
		contentId: text('Content ID', data.contentId, Groups.Content),
		contentTitle: text('Content title', data.contentTitle, Groups.Content),
		trackableId: text('Trackable ID', data.trackableId),
		saved: boolean('Saved', data.saved, Groups.Content),
	};
};
