const rollup = require('rollup')
const logger = require('./logger')

module.exports = async (configs) => {
	for (const [input, output] of configs) {
		const bundle = await rollup.rollup(input)
		await bundle.write(output)
		logger.success(`Bundled ${output.file}`)
	}
}
