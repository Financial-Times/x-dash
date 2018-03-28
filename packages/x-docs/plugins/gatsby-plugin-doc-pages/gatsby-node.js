const path = require("path");
const titleCase = require('title-case');

const closestDir = (dir, match) => !dir
	? false
	: dir.match(match)
		? dir
		: closestDir(path.dirname(dir), match);

exports.onCreateNode = ({node}) => {
	if(node.internal.type === 'MarkdownRemark') {
		const docsFolder = closestDir(node.fileAbsolutePath, /(src)?\/docs$/);
		const pkgsFolder = closestDir(node.fileAbsolutePath, /packages\/[^\/]+$/);
		const pkg = path.basename(pkgsFolder);
		const rel = path.relative(docsFolder, node.fileAbsolutePath).replace(/\.\w+$/, '');

		if(!node.frontmatter.path) {
			node.frontmatter.path = pkg === 'x-docs'
				? `/${rel}`
				: `/packages/${pkg}/${rel}`;
		}

		if(!node.frontmatter.breadcrumbs) {
			const crumbs = rel.split('/').slice(0, -1).map(titleCase);

			node.frontmatter.breadcrumbs = pkg === 'x-docs'
				? crumbs
				: ['Packages', pkg, ...crumbs]
		}

		if(!node.fields || !node.fields.slug) {
			node.fields = Object.assign({}, node.fields, {
				slug: node.frontmatter.path
			});
		}
	}

	return node;
};

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	const blogPostTemplate = path.resolve(`src/templates/blog.js`);

	return graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							path
							title
							breadcrumbs
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.frontmatter.path,
				component: blogPostTemplate,
				context: {
					sitemap: {
						title: node.frontmatter.title,
						breadcrumbs: node.frontmatter.breadcrumbs,
					}
				},
			});
		});
	});
};
