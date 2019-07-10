export const idempotentUpdate = (state, updates = {}) => {
	let neededUpdate = false;
	const newState = { ...state };

	Object.entries(updates).forEach(([key, value]) => {
		if (state[key] !== value) {
			neededUpdate = true;
			newState[key] = value;
		}
	});

	return neededUpdate ? newState : state;
};
