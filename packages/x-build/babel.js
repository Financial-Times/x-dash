module.exports = () => ({
	presets: [
		require('@babel/preset-typescript'),
	],
	plugins: [
		require('@babel/plugin-syntax-jsx'),
	],
});
