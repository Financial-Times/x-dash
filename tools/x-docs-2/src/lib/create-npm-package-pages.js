const path = require('path');

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			allNpmPackage(filter: { private: { eq: false } }) {
				edges {
					node {
						manifest
						fields {
							source
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
				source: node.fields.source,
				name: node.manifest.name
			}
		});
	});
};
