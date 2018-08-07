const crypto = require('crypto');

const hash = (string) => crypto.createHash('md5').update(string).digest('hex');

module.exports = async ({ node, loadNodeContent, actions }) => {
	const { createNode, createParentChildLink } = actions;

	if (node.internal.type === 'File' && node.base === 'package.json') {
		const content = await loadNodeContent(node);
		const json = JSON.parse(content);

		// Assemble node information
		const packageNode = {
			id: `${node.id} >>> NpmPackage`,
			children: [],
			parent: node.id,
			internal: {
				type: 'NpmPackage'
			},
			manifest: json,
			name: json.name.replace('@financial-times/', ''),
			private: Boolean(json.private),
			// Mimic remark transformer
			fileAbsolutePath: node.absolutePath
		};

		// Append unique node hash
		packageNode.internal.contentDigest = hash(JSON.stringify(packageNode));

		createNode(packageNode);
		createParentChildLink({ parent: node, child: packageNode });
	}

	if (node.internal.type === 'File' && node.absolutePath.endsWith('stories/index.js')) {
		const storiesNode = {
			id: `${node.id} >>> Stories`,
			children: [],
			parent: node.id,
			internal: {
				type: 'Stories'
			},
			fileAbsolutePath: node.absolutePath
		};

		// Append unique node hash
		storiesNode.internal.contentDigest = hash(JSON.stringify(storiesNode));

		createNode(storiesNode);
		createParentChildLink({ parent: node, child: storiesNode });
	}
};
