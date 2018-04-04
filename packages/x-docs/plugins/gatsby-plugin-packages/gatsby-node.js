const fs = require('fs-extra');
const path = require('path');
const findUp = require('find-up');
const components = require('@financial-times/x-workbench');
const xEngine = require('@financial-times/x-engine/src/webpack');
const filesystem = require('gatsby-source-filesystem/gatsby-node');
// ensure we get the same 'JSON' type as remark, which, there has to be a better way
const GraphQlJson = require('gatsby-transformer-remark/node_modules/graphql-type-json');

const repoBase = path.dirname(findUp.sync('lerna.json'));

exports.modifyWebpackConfig = function({config, env}) {
	config.merge({
		plugins: [
			xEngine(),
		],
	});
	return config;
};

exports.setFieldsOnGraphQLNodeType = (
	{ type, store, pathPrefix, getNode, cache, reporter },
) => {
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

exports.createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators;
	const packageTemplate = path.resolve(`src/templates/package.js`);
	const storyTemplate = path.resolve(`src/templates/story.js`);

	return graphql(`
		{
			allPackage {
				edges {
					node {
						pkgJson {
							name
						}

						stories
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		result.data.allPackage.edges.forEach(({node}) => {
			const unscoped = path.basename(node.pkgJson.name);

			if (node.stories) {
				for (const story in node.stories) {
					const { title } = node.stories[story];

					createPage({
						path: `/components/${unscoped}/demo/${title}`,
						component: storyTemplate,
						context: {
							sitemap: {
								title,
								breadcrumbs: ['Components', unscoped, 'Demos', title]
							},
							componentName: unscoped,
							componentStory: story,
						},
					})
				}
			}
		});
	});
};

exports.sourceNodes = async props => {
	const {createNode} = props.boundActionCreators;
	const root = path.resolve(repoBase, 'packages');
	const packages = await fs.readdir(root);

	return Promise.all(
		packages
		.filter(f => !f.startsWith('.'))
		.map(async pkg => {
			const dir = path.resolve(root, pkg);
			const pkgPath = path.resolve(dir, 'package.json');
			const readme = path.resolve(dir, 'readme.md');

			const docsPaths = [
				path.resolve(repoBase, 'packages', pkg, 'src/docs'),
				path.resolve(repoBase, 'packages', pkg, 'docs'),
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
				const unscoped = path.basename(pkgJson.name);

				createNode({
					id,
					parent: null,
					children: [],
					internal: {
						contentDigest,
						type: 'Package'
					},
					pkgJson,
					stories: components[unscoped],
				});
			}
		})
	);
};
