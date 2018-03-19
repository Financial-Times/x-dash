const INDEX = /^\d+$/;

export type Tree = { [key: string]: any };

export default (tree: Tree | null, path: string, def: any = undefined): any => {
	const route = path.split('.');

	while (tree !== null && route.length) {
		const leaf = route.shift();

		if (leaf !== undefined && tree.hasOwnProperty(leaf)) {
			tree = tree[leaf];
		} else {
			tree = null;
		}
	}

	return tree === null ? def : tree;
};
