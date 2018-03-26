exports.onCreatePage = ({page, boundActionCreators}) => {
	const { createPage } = boundActionCreators;

	if(page.path === '/') {
		page.layout = 'basic';
		createPage(page);
	}
}
