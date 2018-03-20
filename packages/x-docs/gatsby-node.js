const getComponents = require('@financial-times/x-workbench');
const fs = require('fs');

exports.createPages = () => {};

exports.sourceNodes = ({boundActionCreators}) => {
	const {createNode} = boundActionCreators;

	getComponents().forEach(({kind, fileName, stories}) => {
		createNode({
			id: kind,
			parent: null,
			children: [],
			internal: {
				contentDigest: fs.statSync(fileName).mtime.toString(),
				type: 'Component'
			}
		});
	});
};
