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

exports.createPages = async ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators;
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

	await Promise.all(result.data.allPackage.edges.map(async ({node}) => {
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
	}));
};

exports.sourceNodes = async props => {
	const {createNode} = props.boundActionCreators;
	const {packages: packageGlobs} = require(
		path.resolve(repoBase, 'monorepo.json')
	);

	const fullGlob = packageGlobs.length > 1
		? `{${packageGlobs.join(',')}}`
		: packageGlobs[0];

	const packages = await glob(fullGlob, {
		cwd: repoBase
	});

	return Promise.all(
		packages
		.filter(f => !path.basename(f).startsWith('.'))
		.map(async pkg => {
			const dir = path.resolve(repoBase, pkg);
			const pkgPath = path.resolve(dir, 'package.json');
			const readme = path.resolve(dir, 'readme.md');
			const base = pkg.split(path.sep)[0];

			const docsPaths = [
				path.resolve(dir, 'src/docs'),
				path.resolve(dir, 'docs'),
			];

			let docsPath;

			for(const p of docsPaths) {
				if(await fs.pathExists(p)) {
					docsPath = p;
					break;
				}
			}

			await Promise.all([
				filesystem.sourceNodes(props, {
					name: `package-${pkg}`,
					path: pkgPath,
				}),
				await fs.pathExists(readme) && filesystem.sourceNodes(props, {
					name: `package-${pkg}`,
					path: readme,
				}),
				docsPath && filesystem.sourceNodes(props, {
					name: `package-${pkg}`,
					path: docsPath,
				}),
			]);

			if(await fs.pathExists(pkgPath)) {
				const pkgJson = require(pkgPath);
				const id = `package ${pkgJson.name}`;
				const contentDigest = pkgJson.version;

				const {stories} = components.find(
					component => component.package.name === pkgJson.name
				) || {};

				if(stories) {
					stories.forEach(
						story => {
							delete story.m;
						}
					);
				}

				createNode({
					id,
					parent: null,
					children: [],
					internal: {
						contentDigest,
						type: 'Package'
					},
					pkgJson: {
						name: pkgJson.name,
						version: pkgJson.version,
						description: pkgJson.description,
						private: pkgJson.private,
						style: pkgJson.style,
					},
					pkgRoot: dir,
					stories,
					base,
				});
			}
		})
	);
};
