const path = require('path');
const titleCase = require('title-case');
const findUp = require('find-up');
const removeMarkdown = require('remove-markdown');
const minimatch = require('minimatch');
const get = require('lodash.get');
const chalk = require('chalk');

const repoBase = path.dirname(findUp.sync('lerna.json'));

const closestDir = (dir, match) => !dir || dir === '/'
	? false
	: (match instanceof RegExp ? dir.match(match) : minimatch(dir, match))
		? dir
		: closestDir(path.dirname(dir), match);

exports.onCreateNode = ({node}) => {
	if(node.internal.type === 'MarkdownRemark') {
		const {packages: packageGlobs} = require(
			path.resolve(repoBase, 'lerna.json')
		);

		const absoluteGlobs = packageGlobs.map(
			g => path.resolve(repoBase, g)
		);

		const fullGlob = absoluteGlobs.length > 1
			? `{${absoluteGlobs.join(',')}}`
			: absoluteGlobs[0];

		const docsFolder = closestDir(node.fileAbsolutePath, /(src)?\/docs$/);
		const pkgFolder = closestDir(docsFolder || node.fileAbsolutePath, fullGlob);

		const pkg = path.basename(pkgFolder);
		const root = path.basename(path.dirname(pkgFolder));

		const rel = path.relative(
			docsFolder || pkgFolder,
			node.fileAbsolutePath
		).replace(/\.\w+$/, '').replace(/(readme|index)$/, '');

		if(!node.frontmatter.title) {
			node.frontmatter.title = rel !== ''
				? titleCase(path.basename(rel))
				: pkg;
		}

		const namespace = root === 'components'
			? 'Components'
			: 'Packages';

		if(!node.frontmatter.path) {
			node.frontmatter.path = pkg === 'x-docs' && rel !== ''
				? `/${rel}`
				: `/${namespace.toLowerCase()}/${pkg}/${rel}`;
		}

		if(!node.frontmatter.breadcrumbs) {
			const crumbs = rel.split('/').map(titleCase).filter(a => a);

			node.frontmatter.breadcrumbs = pkg === 'x-docs' && rel !== ''
				? crumbs
				: [namespace, pkg, ...crumbs]
		}

		if(!node.fields || !node.fields.slug) {
			node.fields = Object.assign({}, node.fields, {
				slug: node.frontmatter.path
			});
		}

		node.plainText = removeMarkdown(node.internal.content).replace(/\n/g, '');
	}

	return node;
};

const getDuplicateNodeKeys = (edges, path) => edges.reduce(
	({seen, dupes}, {node}) => {
		const val = get(node, path);

		if(seen.has(val)) {
			dupes.set(val,
				(
					dupes.get(val) || seen.get(val)
				).concat(node)
			);
		} else {
			seen.set(val, [node]);
		}

		return {dupes, seen};
	},
	{
		seen: new Map(),
		dupes: new Map(),
	}
).dupes;

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
						fileAbsolutePath
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		const dupes = getDuplicateNodeKeys(result.data.allMarkdownRemark.edges, 'frontmatter.path')
		if(dupes.size) {
			for(const [url, nodes] of dupes.entries()) {
				const filePaths = nodes.map(
					({fileAbsolutePath}) => '  ◆ ' + chalk.cyan(path.relative(repoBase, fileAbsolutePath))
				).join('\n');

				console.warn();
				console.warn(`${chalk.black.keyword('black').bold.bgYellow(' WARNING ')} there are multiple files that would have the url ${chalk.blue.underline(url)}:

${filePaths}

which file is chosen is arbitrary. you should move of the files to another folder.
				`);
				console.warn();
			}
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
