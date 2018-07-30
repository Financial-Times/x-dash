/* eslint no-console:off */
const rollupConfig = require('./src/rollup-config');
const bundle = require('./src/bundle');
const watch = require('./src/watch');

module.exports = async (options) => {
	const configs = rollupConfig(options);
	const command = process.argv.slice(-1)[0] === '--watch' ? watch : bundle;

	try {
		await command(configs);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
