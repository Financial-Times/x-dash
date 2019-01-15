const { FollowButton } = require('../');

module.exports = {
	component: FollowButton,
	dependencies: {
		'o-fonts': '^3.0.0',
		'o-typography': '^5.5.0'
	},
	stories: [
		require('./with-concept-name'),
		require('./without-concept-name')
	],
	knobs: require('./knobs'),
	package: require('../package.json')
};
