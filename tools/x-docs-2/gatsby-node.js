const createModulePages = require('./src/lib/create-module-pages');
// const createDocumentationPages = require('./src/lib/create-documentation-pages');

exports.createPages = async ({ actions, graphql }) => {
	return Promise.all([
		createModulePages(actions, graphql),
		// createDocumentationPages(actions, graphql)
	]);
};
