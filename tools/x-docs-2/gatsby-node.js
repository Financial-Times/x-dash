const path = require('path');

const repoBase = path.resolve('../../');

const createModulePages = async (actions, graphql) => {
	// Find all of the package manifests for public packages and readme files
	const result = await graphql(`
		query {
			allPackageJson(filter: { private: { eq: false } }) {
				edges {
					node {
						name
						manifest
						parent {
							...on File {
								dir
							}
						}
					}
				}
			}
			allMarkdownRemark {
				edges {
					node {
						html
						parent {
							...on File {
								dir
								base
							}
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const pagesToCreate = result.data.allPackageJson.edges.map(async ({ node }) => {
		// Extract the path from repository root to the package
		const packagePath = path.relative(repoBase, node.parent.dir);

		// Find the associated readme file for this package
		const readme = result.data.allMarkdownRemark.edges.find(({ node }) => {
			const readmePath = path.relative(repoBase, node.parent.dir);
			return node.parent.base === 'readme.md' && packagePath === readmePath;
		});

		actions.createPage({
			component: path.resolve('src/templates/module.jsx'),
			path: packagePath,
			context: {
				type: 'module',
				// Provide the full package manifest
				manifest: node.manifest,
				// Group packages by subfolder
				group: path.dirname(packagePath),
				// Remove @financial-times scope from package name
				title: path.basename(node.name),
				// Set the page HTML to the processed readme
				readme: readme ? readme.node.html : null
			}
		});
	});

	return Promise.all(pagesToCreate);
};

const createDocumentationPages = async (actions, graphql) => {};

exports.createPages = async ({ actions, graphql }) => {
	return Promise.all([
		createModulePages(actions, graphql)
		// createDocumentationPages(actions, graphql)
	]);
};
