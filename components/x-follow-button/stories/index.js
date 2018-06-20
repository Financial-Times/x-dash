const { FollowButton } = require('../');

module.exports = {
	name: 'x-follow-button',
	component: FollowButton,
	dependencies: {
		'o-fonts': '^3.0.0',
		'o-typography': '^5.5.0'
	},
	stories: [
		require('./follow-button')
	],
	knobs: require('./knobs'),
	package: require('../package.json')
};
