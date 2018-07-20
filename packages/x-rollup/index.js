/* eslint no-console:off */

const rollup = require('rollup');
const rollupConfig = require('./src/rollup-config');

module.exports = async (options) => {
	const config = rollupConfig(options);

	for (const [input, output] of config) {
		try {
			console.log(`Bundling ${input.input} ➡ ${output.file}…`);
			const bundle = await rollup.rollup(input);
			await bundle.write(output);
		} catch (error) {
			console.error(error);
			process.exit(1);
		}
	}
};
