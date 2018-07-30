/* eslint no-console:off */
const rollup = require('rollup');

module.exports = async (configs) => {
	for (const [input, output] of configs) {
		console.log(`Bundling ${input.input} ➡ ${output.file}…`);
		const bundle = await rollup.rollup(input);
		await bundle.write(output);
	}
};
