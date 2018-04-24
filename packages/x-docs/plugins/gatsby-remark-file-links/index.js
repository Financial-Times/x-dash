const visit = require('unist-util-visit');

module.exports = (opts) => {
	const { markdownAST, pathPrefix } = opts;
	console.log(opts);

	visit(markdownAST, 'link', node => {
		console.log(node);
	});

	return markdownAST;
};
