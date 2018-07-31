const appendNodeSlugs = require('./src/lib/append-node-slugs');
const createModulePages = require('./src/lib/create-module-pages');
// const createDocumentationPages = require('./src/lib/create-documentation-pages');

exports.onCreateNode = ({ node, actions, getNode }) => {
	appendNodeSlugs(node, actions, getNode);
};

exports.createPages = async ({ actions, graphql }) => {
	return Promise.all([
		createModulePages(actions, graphql),
		// createDocumentationPages(actions, graphql)
	]);
};
