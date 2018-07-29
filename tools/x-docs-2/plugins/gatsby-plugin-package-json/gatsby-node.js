const path = require('path');
const crypto = require('crypto');

const findStories = (json) => {};

// This plugin will override any local package manifests found by the filesystem plugin
exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
	const { createNode, createParentChildLink } = actions;

	if (node.base === 'package.json') {
		const content = await loadNodeContent(node);
		const json = JSON.parse(content);

		// Extract useful information from the manifest
		const manifest = {
			name: json.name,
			description: json.description,
			private: Boolean(json.private),
			style: json.style
		};

		// HACK: infer "type" from parent directory
		const type = path.basename(path.join(node.dir, '..'));

		// Assemble node information
		const packageNode = {
			id: `${node.id} >>> PackageJSON`,
			children: [],
			parent: node.id,
			internal: {
				content,
				type: 'PackageJSON',
			},
			manifest,
			type,
			stories: findStories(json)
		};

		// Append node hash
		packageNode.internal.contentDigest = crypto
			.createHash('md5')
			.update(JSON.stringify(packageNode))
			.digest('hex');

		createNode(packageNode);
		createParentChildLink({ parent: node, child: packageNode });
	}
};
