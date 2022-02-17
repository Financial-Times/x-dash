const rollupConfig = require('./src/rollup-config')
const logger = require('./src/logger')
const bundle = require('./src/bundle')
const watch = require('./src/watch')

module.exports = async (options) => {
	try {
		const configs = rollupConfig(options)
		const command = process.argv.slice(-1)[0] === '--watch' ? watch : bundle

		await command(configs)
	} catch (error) {
		logger.error(error instanceof Error ? error.message : error)
		process.exit(1)
	}
}
