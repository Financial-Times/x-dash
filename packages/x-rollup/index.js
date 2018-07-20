const rollup = require('rollup');
const rollupConfig = require('./src/rollup-config');

module.exports = async (options) => {
	const config = rollupConfig(options);

	for (const [ input, output ] of config) {
		const bundle = await rollup.rollup(input);
		await bundle.write(output);
	}
};
