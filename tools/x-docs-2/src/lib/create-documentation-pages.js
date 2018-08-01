const path = require('path');
const Case = require('case');

const findPageName = (node) => {
	if (node.frontmatter.title) {
		return node.frontmatter.title;
	}

	if (node.headings.some((heading) => heading.depth === 1)) {
		return node.headings.find((heading) => heading.depth === 1).value;
	}

	// HACK: use the file name as a last resort
	return Case.title(path.basename(node.fields.slug));
};

const formatParentName = (node) => {
	return Case.title(node.fields.directoryName);
};

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			allMarkdownRemark(filter: { fields: { sourceName: { eq: "docs" } } }) {
				edges {
					node {
						fields {
							slug
							sourceName
							directoryName
						}
						headings {
							value
							depth
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	result.data.allMarkdownRemark.edges.map(({ node }) => {
		actions.createPage({
			component: path.resolve('src/templates/documentation-page.jsx'),
			path: node.fields.slug,
			context: {
				type: 'documentation-page',
				sourceName: node.fields.sourceName,
				pageName: findPageName(node),
				parentName: formatParentName(node),
				slug: node.fields.slug,
			}
		});
	});
};
