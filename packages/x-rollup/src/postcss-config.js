const path = require('path');

module.exports = (style) => {
	return {
		extract: style,
		modules: true,
		use: [
			[
				'sass',
				{
					includePaths: [path.resolve(process.cwd(), 'bower_components')]
				}
			],
			'stylus',
			'less'
		]
	};
};
