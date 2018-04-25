const visit = require('unist-util-visit');

// /components/x-teaser/readme.md => /components/x-teaser
// /components/x-teaser/docs/rules.md => /components/x-teaser/rules
// /tools/x-docs/src/docs/guides/index.md => /guides
const repoPathToDocsPath = repoPath => {
	const [root, pkg, ...pathParts] = repoPath.slice(1).split('/');
	const path = pathParts.join('/')
		.replace(/^(src\/)?docs/, '')
		.replace(/\.\w+$/, '')
		.replace(/(readme|index)$/, '');

	return pkg === 'x-docs'
		? path
		: `/${root}/${pkg}${path}`;
};

module.exports = (opts) => {
	const { markdownAST, pathPrefix, files } = opts;

	visit(markdownAST, 'link', node => {
		const isInternalAbsoluteHref = node.url.startsWith('/');
		const isLinkToRealFile = files.some(
			({absolutePath}) => absolutePath.endsWith(
				node.url
			)
		);

		if(isInternalAbsoluteHref && isLinkToRealFile) {
			node.url = repoPathToDocsPath(node.url);
		}
	});

	return markdownAST;
};
