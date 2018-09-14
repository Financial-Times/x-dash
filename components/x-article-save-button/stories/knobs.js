module.exports = (data, { text, boolean, selectV2 }) => {

	const Groups = {
		Form: 'Form',
		Content: 'Content'
	};

	return {
		action: text('Form action', data.action, Groups.Form),
		method: selectV2('Form method', ['GET', 'POST'], data.method, Groups.Form),
		csrfToken: text('CSRF token', data.csrfToken, Groups.Form),
		contentId: text('Content ID', data.contentId, Groups.Content),
		contentTitle: text('Content title', data.contentTitle, Groups.Content),
		trackableId: text('Trackable ID', data.trackableId),
		saved: boolean('Saved', data.saved, Groups.Content),
	};
};
