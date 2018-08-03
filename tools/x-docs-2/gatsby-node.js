const decorateNodes = require('./src/lib/decorate-nodes');
const createNpmPackagePages = require('./src/lib/create-npm-package-pages');
const createDocumentationPages = require('./src/lib/create-documentation-pages');

exports.onCreateNode = ({ node, actions, getNode }) => {
	decorateNodes(node, actions, getNode);
};

exports.createPages = async ({ actions, graphql }) => {
	return Promise.all([
		createNpmPackagePages(actions, graphql),
		createDocumentationPages(actions, graphql)
	]);
};
