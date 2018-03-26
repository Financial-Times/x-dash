const fs = require('fs-extra');
const paramCase = require('param-case');
const path = require('path');
const findUp = require('find-up');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');
const xEngine = require('@financial-times/x-engine/src/webpack');

const allStories = loadStories();

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

	allStories.forEach(
		stories => [].concat(stories).forEach(
			story => console.log(story)
		)
	);

	return graphql(`
		{
			allPackage {
				edges {
					node {
						pkgJson {
							name
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

			createPage({
				path: `/package/${unscoped}`,
				component: packageTemplate,
				context: {
					sitemap: {
						title: 'Package.json',
						breadcrumbs: ['Package', unscoped]
					},
					pkgJson: node.pkgJson
				},
			});
		});
	});
};

exports.sourceNodes = async ({boundActionCreators}) => {
	const {createNode} = boundActionCreators;

	const root = path.resolve(
		await findUp('lerna.json'),
		'../packages'
	);

	const packages = await fs.readdir(root);

	return Promise.all(
		packages
		.filter(f => !f.startsWith('.'))
		.map(async pkg => {
			const dir = path.resolve(root, pkg);
			const pkgPath = path.resolve(dir, 'package.json');

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
				});
			}
		})
	);
};
