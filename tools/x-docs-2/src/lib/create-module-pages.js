const path = require('path');

module.exports = async (actions, graphql) => {
	// Find all of the package manifests for public packages and readme files
	const result = await graphql(`
		query {
			allPackageJson(filter: { private: { eq: false } }) {
				edges {
					node {
						name
						manifest
						fileAbsolutePath
					}
				}
			}
			allMarkdownRemark {
				edges {
					node {
						html
						fileAbsolutePath
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const pagesToCreate = result.data.allPackageJson.edges.map(async ({ node }) => {
		// Calculate the path from repository root to the module
		const repoRoot = path.resolve('../../');
		const modulePath = path.dirname(node.fileAbsolutePath);
		const relativePath = path.relative(repoRoot, modulePath);

		// Find the associated readme file for this package
		const readme = result.data.allMarkdownRemark.edges.find(({ node }) => {
			const filePath = path.dirname(node.fileAbsolutePath);
			const fileName = path.basename(node.fileAbsolutePath);

			return fileName === 'readme.md' && modulePath === filePath;
		});

		actions.createPage({
			component: path.resolve('src/templates/module.jsx'),
			path: relativePath,
			context: {
				type: 'module',
				// Provide the full package manifest
				manifest: node.manifest,
				// Group packages by subfolder
				group: path.dirname(relativePath),
				// Remove @financial-times scope from package name
				title: path.basename(node.name),
				// Set the page HTML to the processed readme
				readme: readme ? readme.node.html : null
			}
		});
	});

	return Promise.all(pagesToCreate);
};
