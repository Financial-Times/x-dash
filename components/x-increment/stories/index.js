import { Increment } from '../src/Increment';

export default {
	component: Increment,
	package: require('../package.json'),
	stories: [
		require('./increment'),
		require('./async'),
	],
	knobs: require('./knobs').default,
};
