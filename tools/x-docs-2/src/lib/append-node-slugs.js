const path = require('path');

const typesWithSlugs = new Set(['MarkdownRemark', 'NpmPackage']);

const slug = (file) => {
	// If the file is an npm package readme or manifest then use the parent directory name
	if (file.base === 'readme.md' || file.base === 'package.json') {
		return path.join(file.sourceInstanceName, file.relativeDirectory);
	} else {
		return path.join(file.sourceInstanceName, file.name);
	}
};

module.exports = (node, actions, getNode) => {
	if (typesWithSlugs.has(node.internal.type)) {
		const file = getNode(node.parent);

		// Group files by source type - docs, components, or packages
		actions.createNodeField({
			node,
			name: 'group',
			value: file.sourceInstanceName
		});

		actions.createNodeField({
			node,
			name: 'slug',
			value: slug(file)
		});
	}
};
