export const title = 'Async';

export const data = {
	count: 1,
	timeout: 1000,
	id: 'base-increment-static-id',
};

export const knobs = Object.keys(data);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
export const m = module;
