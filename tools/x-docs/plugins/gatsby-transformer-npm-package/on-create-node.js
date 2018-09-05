const crypto = require('crypto');

const hash = (string) => crypto.createHash('md5').update(string).digest('hex');

module.exports = ({ node, actions }) => {
	const { createNode, createParentChildLink } = actions;

	if (node.internal.type === 'File' && node.base === 'package.json') {
		const json = require(node.absolutePath);

		// Assemble node information
		const npmPackageNode = {
			id: `${node.id} >>> NpmPackage`,
			children: [],
			parent: node.id,
			internal: {
				type: 'NpmPackage'
			},
			manifest: json,
			name: json.name,
			private: Boolean(json.private),
			// Mimic remark transformer
			fileAbsolutePath: node.absolutePath
		};

		// Append unique node hash
		npmPackageNode.internal.contentDigest = hash(JSON.stringify(npmPackageNode));

		createNode(npmPackageNode);
		createParentChildLink({ parent: node, child: npmPackageNode });
	}

	if (node.internal.type === 'File' && node.absolutePath.endsWith('stories/index.js')) {
		const contents = require(node.absolutePath);

		const storiesNode = {
			id: `${node.id} >>> Stories`,
			children: [],
			parent: node.id,
			internal: {
				type: 'Stories'
			},
			stories: contents.stories.map((story) => story.title),
			fileAbsolutePath: node.absolutePath
		};

		// Append unique node hash
		storiesNode.internal.contentDigest = hash(JSON.stringify(storiesNode));

		createNode(storiesNode);
		createParentChildLink({ parent: node, child: storiesNode });
	}
};
