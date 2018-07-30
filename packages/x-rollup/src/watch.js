/* eslint no-console:off */
const path = require('path');
const rollup = require('rollup');

module.exports = (configs) => {
	// Merge the separate input/output options for each bundle
	const formattedConfigs = configs.map(([ input, output ]) => {
		return { ...input, output };
	});

	return new Promise((resolve, reject) => {
		const watcher = rollup.watch(formattedConfigs);

		console.log('Watching files, press ctrl + c to stop');

		watcher.on('event', (event) => {
			const time = new Date().toLocaleTimeString();

			switch (event.code) {
				case 'END':
					console.log(`${time} waiting for changes…`);
					break;

				case 'BUNDLE_END':
					console.log(`${time} bundling ${path.basename(event.output[0])}`);
					break;

				case 'ERROR':
					console.warn(`${time} Failed to create bundle:`, event.error);
					break;

				case 'FATAL':
					reject(event.error);
					break;
			}
		});
	});
};
