const { Teaser, presets } = require('@financial-times/x-teaser');
const extend = require('../utils/extend');

module.exports = (context, { hash }) => {
	const preset = presets[hash.preset];
	const props = extend(context, preset, hash);

	return Teaser(props);
};
