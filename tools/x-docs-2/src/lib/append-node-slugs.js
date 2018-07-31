const path = require('path');

const nodeTypes = new Set(['MarkdownRemark', 'PackageJSON']);

module.exports = (node, actions, getNode) => {
	if (nodeTypes.has(node.internal.type)) {
		const file = getNode(node.parent);

		// Group files by source type - docs, components, or packages
		actions.createNodeField({
			node,
			name: 'group',
			value: file.sourceInstanceName
		});

		let slug;

		// If the file is an npm package readme then use the parent directory name
		if (file.base === 'readme.md' || file.base === 'package.json') {
			slug = path.join(file.sourceInstanceName, file.relativeDirectory);
		} else {
			slug = path.join(file.sourceInstanceName, file.name);
		}

		actions.createNodeField({
			node,
			name: 'slug',
			value: slug
		});
	}
};
