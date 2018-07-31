const path = require('path');

module.exports = async (actions, graphql) => {
	// Find all of the package manifests for public packages and readme files
	const result = await graphql(`
		query {
			allNpmPackage(filter: { private: { eq: false } }) {
				edges {
					node {
						manifest
						fields {
							group
							slug
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
				slug: node.fields.slug,
				name: node.manifest.name,
				group: node.fields.group
			}
		});
	});
};
