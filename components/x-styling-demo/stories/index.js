const { StylingDemo } = require('../');
const pkg = require('../package.json');

module.exports = {
	name: 'x-styling-demo',
	component: StylingDemo,
	stories: [
		require('./styling'),
	],
	styles: [
		`/x-styling-demo/${pkg.styleMain}`,
	]
};
