const fs = require('fs');
const path = require('path');

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			npmPackages: allNpmPackage(filter: { private: { eq: false } }) {
				edges {
					node {
						name
						manifest
						fileAbsolutePath
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
		const relPath = path.dirname(node.fileAbsolutePath);

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
				// Flag if Storybook demos are available for this package
				storybook: fs.existsSync(path.join(relPath, 'stories', 'index.js')),
				// Associate readme and story nodes via slug
				packagePath: path.join(pagePath, 'package'),
				readmePath: path.join(pagePath, 'readme')
			}
		});
	});
};
