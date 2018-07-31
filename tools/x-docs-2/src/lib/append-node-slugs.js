const path = require('path');

const typesWithSlugs = new Set(['MarkdownRemark', 'NpmPackage']);

const slugsWithoutFileName = new Set(['index.md', 'readme.md', 'package.json']);

const createSlug = (file) => {
	// If the file is an index file, readme or manifest then use the parent directory name
	if (slugsWithoutFileName.has(file.base)) {
		return path.join(file.sourceInstanceName, file.relativeDirectory);
	} else {
		return path.join(file.sourceInstanceName, file.relativeDirectory, file.name);
	}
};

module.exports = (node, actions, getNode) => {
	if (typesWithSlugs.has(node.internal.type)) {
		const file = getNode(node.parent);

		// Group files by source type (currently: docs, components, packages)
		actions.createNodeField({
			node,
			name: 'source',
			value: file.sourceInstanceName
		});

		actions.createNodeField({
			node,
			name: 'slug',
			value: createSlug(file)
		});
	}
};
