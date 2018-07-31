// Because we are loading specific subfolders into Gatsby and not the project root we need to
// prepend each slug with the source type.

const path = require('path');

const nodeTypes = new Set(['MarkdownRemark', 'PackageJSON']);

module.exports = (node, actions, getNode) => {
	if (nodeTypes.has(node.internal.type)) {
		const file = getNode(node.parent);

		actions.createNodeField({
			node,
			name: 'rootType',
			value: file.sourceInstanceName
		});

		actions.createNodeField({
			node,
			name: 'rootDirectory',
			value: path.join(file.sourceInstanceName, file.relativeDirectory)
		});

		actions.createNodeField({
			node,
			name: 'rootPath',
			value: path.join(file.sourceInstanceName, file.relativePath)
		});
	}
};
