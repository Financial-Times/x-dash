const crypto = require('crypto');

module.exports = async ({ node, loadNodeContent, actions }) => {
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
			manifest: json,
			name: json.name,
			private: Boolean(json.private)
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
