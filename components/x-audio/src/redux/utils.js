export const idempotentUpdate = (state, updates = {}) => {
	return Object.entries(updates).some(([key, value]) => state[key] !== value)
		? { ...state, ...updates }
		: state;
};
