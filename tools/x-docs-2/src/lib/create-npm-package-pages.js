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
			// Remove the file name from the slug
			path: path.resolve(node.fields.slug, '..'),
			// Data passed to context is available in page queries as GraphQL variables.
			context: {
				type: `npm-package-${node.fields.source}`,
				title: node.name.replace('@financial-times/', ''),
				source: node.fields.source,
				packageName: node.manifest.name,
				packageDescription: node.manifest.description,
				// Associate readme and story nodes via slug
				readmePath: path.resolve(node.fields.slug, '../readme'),
				storiesPath: path.resolve(node.fields.slug, '../stories'),
				packagePath: path.resolve(node.fields.slug, '../package')
			}
		});
	});
};
