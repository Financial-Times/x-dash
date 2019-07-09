export const shallowEquals = (a = {}, b = {}) => {
	for (let p in a) {
		if (a.hasOwnProperty(p)) {
			if (a[p] !== b[p]) {
				return false;
			}
		}
	}

	for (let p in b) {
		if (b.hasOwnProperty(p)) {
			if (a[p] !== b[p]) {
				return false;
			}
		}
	}

	return true;
};
