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
		// Package manifest slug will be /package so remove it
		const pagePath = path.dirname(node.fields.slug);

		actions.createPage({
			component: path.resolve('src/templates/npm-package.jsx'),
			// Remove the file name from the slug
			path: pagePath,
			// Data passed to context is available in page queries as GraphQL variables.
			context: {
				type: `npm-package-${node.fields.source}`,
				title: node.name.replace('@financial-times/', ''),
				source: node.fields.source,
				packageName: node.manifest.name,
				packageDescription: node.manifest.description,
				// Associate readme and story nodes via slug
				storiesPath: path.join(pagePath, 'stories'),
				packagePath: path.join(pagePath, 'package'),
				readmePath: path.join(pagePath, 'readme')
			}
		});
	});
};
