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

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			allMarkdownRemark(filter: { fields: { sourceName: { eq: "docs" } } }) {
				edges {
					node {
						id
						fields {
							slug
							sourceName
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
			// the context object is passed to the template pageQuery
			context: {
				type: 'documentation-page',
				sourceName: node.fields.sourceName,
				pageName: findPageName(node)
			}
		});
	});
};
