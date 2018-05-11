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

const repoBase = path.dirname(findUp.sync('lerna.json'));

exports.modifyWebpackConfig = function({config, env}) {
	config.merge({
		plugins: [
			xEngine(),
		],
		resolve: {
			alias: {
				'@financial-times/x-engine': '@financial-times/x-engine/src/client',
			},
		},
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
						path: `/components/${unscoped}/demo/${paramCase(title)}`,
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
	const {packages: packageGlobs} = require(
		path.resolve(repoBase, 'lerna.json')
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
			
			console.log(
				readme,
				await fs.pathExists(readme)
			);

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
					base,
				});
			}
		})
	);
};
