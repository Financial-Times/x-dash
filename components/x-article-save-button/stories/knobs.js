module.exports = (data, { text, boolean, selectV2 }) => {

	return {
		action: text('Form action', data.action),
		method: selectV2('Form method', ['GET', 'POST'], data.method),
		csrfToken: text('CSRF token', data.csrfToken),
		contentId: text('Content ID', data.contentId),
		saved: boolean('Saved', data.saved)
	};
};
