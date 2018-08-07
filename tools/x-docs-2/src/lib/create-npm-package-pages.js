const path = require('path');

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			npmPackages: allNpmPackage(filter: { private: { eq: false } }) {
				edges {
					node {
						name
						manifest
						fields {
							slug
							source
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	result.data.npmPackages.edges.map(({ node }) => {
		actions.createPage({
			component: path.resolve('src/templates/npm-package.jsx'),
			path: node.fields.slug,
			// Data passed to context is available in page queries as GraphQL variables.
			context: {
				type: 'npm-package',
				title: node.name,
				source: node.fields.source
			}
		});
	});
};
