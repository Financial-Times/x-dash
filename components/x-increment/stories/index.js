const { Increment } = require('../');

module.exports = {
	name: 'x-increment',
	component: Increment,
	stories: [
		require('./increment'), // { title, data, story, m }
		require('./async'),
	],
};
