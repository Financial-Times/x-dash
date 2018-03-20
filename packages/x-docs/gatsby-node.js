const getComponents = require('@financial-times/x-workbench');
const fs = require('fs');

exports.createPages = () => {};

exports.sourceNodes = ({boundActionCreators}) => {
	const {createNode} = boundActionCreators;

	getComponents().forEach(({kind, fileName, stories}) => {
		const id = `component ${kind}`;

		const children = stories.map(({name}) => {
			const childId = `${id} story ${name}`;

			createNode({
				id: childId,
				parent: id,
				children: [],
				internal: {
					contentDigest: fs.statSync(fileName).mtime.toString(),
					type: 'Story'
				},
				name,
			});

			return childId;
		});

		createNode({
			id,
			parent: null,
			children,
			internal: {
				contentDigest: fs.statSync(fileName).mtime.toString(),
				type: 'Component'
			},
			kind,
			fileName,
		});
	});
};
