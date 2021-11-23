/**
 * Deep Get
 * @param {{ [key: string]: any }} tree
 * @param {string} path
 * @param {any} defaultValue
 * @returns {any | null}
 */
module.exports = (tree, path, defaultValue) => {
	const route = path.split('.')

	while (tree !== null && route.length) {
		const leaf = route.shift()

		if (leaf !== undefined && tree.hasOwnProperty(leaf)) {
			tree = tree[leaf]
		} else {
			tree = null
		}
	}

	return tree === null ? defaultValue : tree
}
