const rollupConfig = require('./src/rollup-config');
const logger = require('./src/logger');
const bundle = require('./src/bundle');
const watch = require('./src/watch');

module.exports = async (options) => {
	const configs = rollupConfig(options);
	const command = process.argv.slice(-1)[0] === '--watch' ? watch : bundle;

	try {
		await command(configs);
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
};
