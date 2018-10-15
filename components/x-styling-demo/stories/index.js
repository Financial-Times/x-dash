import { Button } from '../src/Button';

export default {
	component: Button,
	package: require('../package.json'),
	stories: [
		require('./styling'),
	],

	knobs: (data, { boolean }) => ({
		danger() {
			return boolean('Danger', data.danger);
		},

		large() {
			return boolean('Large', data.large);
		}
	}),
};
