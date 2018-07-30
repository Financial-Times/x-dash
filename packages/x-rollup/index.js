/* eslint no-console:off */

const path = require('path');
const rollup = require('rollup');
const rollupConfig = require('./src/rollup-config');

const bundle = async (configs) => {
	for (const [input, output] of configs) {
		console.log(`Bundling ${input.input} ➡ ${output.file}…`);
		const bundle = await rollup.rollup(input);
		await bundle.write(output);
	}
};

const watch = async (configs) => {
	const mergedConfigs = configs.map(([ input, output ]) => {
		return { ...input, output };
	});

	const watcher = rollup.watch(mergedConfigs);

	console.log(`Watching files, press ctrl + c to stop`);

	watcher.on('event', (event) => {
		const time = new Date().toLocaleTimeString();

		switch (event.code) {
			case 'END':
				console.log(`${time} waiting for changes…`);
				break;

			case 'BUNDLE_END':
				console.log(`${time} bundling ${event.output.map((out) => path.basename(out))}`);
				break;

			case 'ERROR':
				console.error('Failed to create bundle', event.error);
				break;

			case 'FATAL':
				console.error('Watch task failed', event.error);
				process.exit(1);
				break;
		}
	});
};

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
