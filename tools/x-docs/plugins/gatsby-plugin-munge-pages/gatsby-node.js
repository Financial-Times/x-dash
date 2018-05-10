const titleCase = require('title-case');

exports.onCreatePage = ({page, boundActionCreators}) => {
	const { createPage } = boundActionCreators;

	if(page.path === '/') {
		page.layout = 'splash';
	}

	if(!page.context.sitemap && page.path !== '/dev-404-page/') {
		const breadcrumbs = page.path.split('/')
			.filter(part => part !== '')
			.map(titleCase);

		page.context.sitemap = {
			breadcrumbs,
			title: breadcrumbs[breadcrumbs.length - 1]
		};
	}

	createPage(page);
}
