const path = require('path');
const Case = require('case');

const findName = (node) => {
	if (node.frontmatter.title) {
		return node.frontmatter.title;
	}

	if (node.headings.some((heading) => heading.depth === 1)) {
		return node.headings.find((heading) => heading.depth === 1).value;
	}

	// HACK: use the file name as a last resort
	return Case.title(path.basename(node.fields.slug));
};

const findSection = (node) => {
	// TODO: actually make this work
	// HACK: use first subfolder name as section name
	const parts = node.fields.slug.split(path.sep);
	return parts.length > 2 ? Case.title(parts[1]) : null;
};

module.exports = async (actions, graphql) => {
	const result = await graphql(`
		query {
			allMarkdownRemark(filter: { fields: { source: { eq: "docs" } } }) {
				edges {
					node {
						fields {
							slug
							source
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
				slug: node.fields.slug,
				source: node.fields.source,
				name: findName(node),
				section: findSection(node)
			}
		});
	});
};
