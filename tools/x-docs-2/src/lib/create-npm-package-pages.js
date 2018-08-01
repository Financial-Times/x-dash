const path = require('path');

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			allNpmPackage(filter: { private: { eq: false } }) {
				edges {
					node {
						manifest
						fields {
							slug
							sourceName
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	result.data.allNpmPackage.edges.map(({ node }) => {
		actions.createPage({
			component: path.resolve('src/templates/npm-package.jsx'),
			path: node.fields.slug,
			context: {
				type: 'npm-package',
				sourceName: node.fields.sourceName,
				pageName: node.manifest.name,
				parentName: null,
				slug: node.fields.slug,
			}
		});
	});
};
