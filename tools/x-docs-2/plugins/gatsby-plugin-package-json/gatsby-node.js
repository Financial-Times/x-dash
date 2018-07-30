const crypto = require('crypto');

const findStories = (json) => {};

// This plugin will create new nodes for any package manifests found by the filesystem plugin
exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
	const { createNode, createParentChildLink } = actions;

	if (node.base === 'package.json') {
		const content = await loadNodeContent(node);
		const json = JSON.parse(content);

		// Assemble node information
		const packageNode = {
			id: `${node.id} >>> PackageJSON`,
			children: [],
			parent: node.id,
			internal: {
				content,
				type: 'PackageJSON',
			},
			name: json.name,
			description: json.description,
			private: Boolean(json.private),
			style: json.style,
			stories: findStories(json)
		};

		// Append unique node hash
		packageNode.internal.contentDigest = crypto
			.createHash('md5')
			.update(JSON.stringify(packageNode))
			.digest('hex');

		createNode(packageNode);
		createParentChildLink({ parent: node, child: packageNode });
	}
};
