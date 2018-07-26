const fs = require('fs-extra');
const path = require('path');
const findUp = require('find-up');
const components = require('@financial-times/x-workbench');
const xEngine = require('@financial-times/x-engine/src/webpack');
const filesystem = require('gatsby-source-filesystem/gatsby-node');
const paramCase = require('param-case');
// ensure we get the same 'JSON' type as remark, which, there has to be a better way
const GraphQlJson = require('gatsby-transformer-remark/node_modules/graphql-type-json');
const glob = require('glob-promise');

const repoBase = path.dirname(findUp.sync('monorepo.json'));

exports.modifyWebpackConfig = function({ config }) {
	config.merge({
		plugins: [
			xEngine()
		],
		resolve: {
			alias: {
				'@financial-times/x-engine': '@financial-times/x-engine/src/client',
			},
		}
	});

	return config;
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
	if (type.name !== 'Package') {
		return {}
	}

	return {
		stories: {
			type: GraphQlJson,
			resolve(node) {
				return node.stories;
			}
		}
	}
}

exports.createPages = async ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;
	const storyTemplate = path.resolve(`src/templates/story.js`);

	const result = await graphql(`
		{
			allPackage {
				edges {
					node {
						pkgJson {
							name
							style
						}
						pkgRoot
						stories
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const pagesToCreate = result.data.allPackage.edges.map(async ({node}) => {
		const unscoped = path.basename(node.pkgJson.name);

		if (node.stories) {
			for (const story in node.stories) {
				const { title } = node.stories[story];

				const styles = node.pkgJson.style
					? await fs.readFile(
						path.resolve(node.pkgRoot, node.pkgJson.style),
						'utf8'
					)
					: null;

				createPage({
					path: `/components/${unscoped}/demo/${paramCase(title)}`,
					component: storyTemplate,
					context: {
						sitemap: {
							title,
							breadcrumbs: ['Components', unscoped, 'Demos', title]
						},
						componentFullName: node.pkgJson.name,
						componentName: unscoped,
						componentStory: story,
						componentStyles: styles,
						story: node.stories[story],
					},
				})
			}
		}
	});

	return Promise.all(pagesToCreate);
};

// This function will go and find all of the packages contained in the repository
exports.sourceNodes = async (props) => {
	const { createNode } = props.boundActionCreators;

	// load root config
	const config = require(path.resolve(repoBase, 'monorepo.json'));

	// find all roots matching the package globs
	const packagePaths = await glob(`{${config.packages.join(',')}}`, {
		cwd: repoBase
	});

	// filter out any non x- files and folders
	const filteredPaths = packagePaths.filter((f) => path.basename(f).startsWith('x-'));

	const nodesToCreate = filteredPaths.map(async (packagePath) => {
		const packageFullPath = path.resolve(repoBase, packagePath);
		const manifestPath = path.resolve(packageFullPath, 'package.json');
		const readmePath = path.resolve(packageFullPath, 'readme.md');
		const docsPath = path.resolve(packageFullPath, 'docs');
		const basePath = packagePath.split(path.sep).shift();

		// load the package manifest
		const manifest = require(manifestPath);

		// check if the source files exist
		const [ hasReadme, hasDocs ] = await Promise.all([
			fs.pathExists(readmePath),
			fs.pathExists(docsPath)
		]);

		// pull all of the files into Gatsby
		await Promise.all([
			filesystem.sourceNodes(props, {
				name: `package-${packagePath}`,
				path: manifestPath
			}),
			hasReadme && filesystem.sourceNodes(props, {
				name: `package-${packagePath}`,
				path: readmePath
			}),
			hasDocs && filesystem.sourceNodes(props, {
				name: `package-${packagePath}`,
				path: docsPath
			})
		]);

		// HACK: attempt to pull in any stories from workbench for this package
		const { stories } = components.find((component) => {
			return component.package.name === manifest.name;
		}) || {};

		// HACK: if the component has stories then remove references used for hot-reloading
		if (stories) {
			stories.forEach((story) => {
				delete story.m;
			});
		}

		// Add the source node
		createNode({
			id: `package ${manifest.name}`,
			parent: null,
			children: [],
			internal: {
				contentDigest: manifest.version, // TODO: remove
				type: 'Package'
			},
			pkgJson: {
				name: manifest.name,
				version: manifest.version, // TODO: remove
				description: manifest.description,
				private: Boolean(manifest.private),
				style: manifest.style,
			},
			pkgRoot: packageFullPath,
			stories,
			base: basePath,
		});
	});

	return Promise.all(nodesToCreate);
};
