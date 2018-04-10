const { Teaser, presets } = require('@financial-times/x-teaser');

const RESERVED = new Set([ 'data', 'preset' ]);

const options = (hash) => {
	const options = {};

	for (const item in hash) {
		if (RESERVED.has(item) === false) {
			options[item] = hash[item];
		}
	}

	return options;
};

module.exports = ({ hash }) => {
	const preset = presets[hash.preset];
	const props = Object.assign(hash.data, preset, options(hash));

	return Teaser(props);
};
