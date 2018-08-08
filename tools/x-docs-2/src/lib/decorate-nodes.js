const path = require('path');

const nodeTypesToSlug = new Set(['MarkdownRemark', 'NpmPackage', 'Stories']);

const createSlug = (file) => {
	const { dir = '', name } = path.parse(file.relativePath);

	// If the file is an index file then use the parent directory name
	return path.join(file.sourceInstanceName, dir, name === 'index' ? '' : name).toLowerCase();
};

module.exports = (node, actions, getNode) => {
	if (nodeTypesToSlug.has(node.internal.type)) {
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
			value: '/' + createSlug(file)
		});
	}
};
