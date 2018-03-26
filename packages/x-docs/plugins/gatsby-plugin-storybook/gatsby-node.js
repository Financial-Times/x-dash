const fs = require('fs');
const paramCase = require('param-case');
const path = require('path');

exports._createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators;
	const storyTemplate = path.resolve(`src/templates/story.js`);

	return graphql(`
		{
			allComponent {
				edges {
					node {
						kind,
						fileName,
						stories: childrenStory {
							name,
							path
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			return Promise.reject(result.errors);
		}

		result.data.allComponent.edges.forEach(({node}) => {
			node.stories.forEach(({name, path}) => {
				createPage({
					path,
					component: storyTemplate,
					context: {
						sitemap: {
							title: name,
							breadcrumbs: ['Component', node.kind],
						},
						name, kind: node.kind
					},
				});
			})
		});
	});
};

exports._sourceNodes = ({boundActionCreators}) => {
	const {createNode} = boundActionCreators;

	getComponents().forEach(({kind, fileName, stories}) => {
		const id = `component ${kind}`;
		//TODO dependencies?
		const contentDigest = fs.statSync(fileName).mtime.toString();

		const children = stories.map(({name}) => {
			const childId = `${id} story ${name}`;

			createNode({
				id: childId,
				parent: id,
				children: [],
				internal: {
					contentDigest,
					type: 'Story'
				},
				name,
				path: `/component/${paramCase(kind)}/${paramCase(name)}`,
			});

			return childId;
		});

		createNode({
			id,
			parent: null,
			children,
			internal: {
				contentDigest,
				type: 'Component'
			},
			kind,
			fileName,
		});
	});
};
