const resolvePlugin = (plugin) => {
	if (Array.isArray(plugin)) {
		return [require.resolve(plugin[0]), plugin[1]];
	} else {
		return require.resolve(plugin);
	}
};

module.exports = (targets = []) => ({
	include: '**/*.{js,jsx}',
	plugins: [
		// this plugin is misleadingly named, it includes a general JSX parser and helper 🙄
		['babel-plugin-transform-react-jsx', {
			pragma: 'h',
			useBuiltIns: true,
		}],
		// although this feature is at stage 4, we'd have to use babel 7 to get the version
		// of preset-env that supports it 😖
		['babel-plugin-transform-object-rest-spread', {
			useBuiltIns: true,
		}],
		// don't include any of babel's internal helpers in the output
		'babel-plugin-external-helpers',
		['fast-async', {
			compiler: {
				noRuntime: true,
			},
		}],
	].map(resolvePlugin),
	presets: [
		['babel-preset-env', {
			targets,
			modules: false,
			exclude: ['transform-regenerator', 'transform-async-to-generator'],
		}],
	].map(resolvePlugin),
});
