const { Teaser, presets } = require('@financial-times/x-teaser');

module.exports = (context, { hash }) => {
	const preset = presets[hash.preset];
	const props = Object.assign(context, preset, hash);

	return Teaser(props);
};
