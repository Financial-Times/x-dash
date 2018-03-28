const fs = require('fs-extra');
const paramCase = require('param-case');
const path = require('path');
const findUp = require('find-up');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');
const xEngine = require('@financial-times/x-engine/src/webpack');
const filesystem = require('gatsby-source-filesystem/gatsby-node');

const repoBase = path.dirname(findUp.sync('lerna.json'));

const allStories = loadStories();

for(const component in allStories) {
	delete allStories[component].module;
	allStories[component].stories = Object.keys(allStories[component].stories);
}

exports.modifyWebpackConfig = function({config, env}) {
	config.merge({
		plugins: [
			xEngine(),
		],
	});
	return config;
};

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

						stories {
							title
							stories
						}
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

			if(node.stories) {
				node.stories.stories.forEach(story => {
					createPage({
						path: `/package/${unscoped}/demo/${paramCase(story)}`,
						component: storyTemplate,
						context: {
							sitemap: {
								title: story,
								breadcrumbs: ['Package', unscoped, 'Demos']
							},
							storyCategory: node.pkgJson.name
						},
					});
				});
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

				createNode({
					id,
					parent: null,
					children: [],
					internal: {
						contentDigest,
						type: 'Package'
					},
					pkgJson,
					stories: allStories[pkgJson.name],
				});
			}
		})
	);
};
