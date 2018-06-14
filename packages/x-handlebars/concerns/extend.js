// much faster but much less safe Object.assign() which always creates a new obj
function extend(...items) {
	const target = {};

	for (let i = 0, len = items.length; i < len; i++) {
		const item = items[i];

		if (item) {
			for (const prop in item) {
				target[prop] = item[prop];
			}
		}
	}

	return target;
}

module.exports = extend;
