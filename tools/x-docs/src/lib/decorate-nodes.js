const path = require('path');

const nodeTypesToSlug = new Set(['MarkdownRemark', 'NpmPackage', 'Stories']);

const repoRoot = path.resolve('../../');

const createSlug = (file) => {
	const pathFromRoot = path.relative(repoRoot, file.absolutePath);
	const { dir, name } = path.parse(pathFromRoot);

	// If the file is an index file then use the parent directory name
	return path.join(dir, name === 'index' ? '' : name).toLowerCase();
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
