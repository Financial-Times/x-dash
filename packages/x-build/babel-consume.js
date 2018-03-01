module.exports = () => ({
	presets: [
		require('@babel/preset-react'),
		[require('@babel/preset-env'), {
			'targets': {
				'node': 'current'
			}
		}],
	],
});
