const path = require('path')
const rollup = require('rollup')
const logger = require('./logger')

module.exports = (configs) => {
	// Merge the separate input/output options for each bundle
	const formattedConfigs = configs.map(([input, output]) => {
		return { ...input, output }
	})

	return new Promise((resolve, reject) => {
		const watcher = rollup.watch(formattedConfigs)

		logger.info('Watching files, press ctrl + c to stop')

		watcher.on('event', (event) => {
			switch (event.code) {
				case 'END':
					logger.message('Waiting for changes…')
					break

				case 'BUNDLE_END':
					logger.success(`Bundled ${path.relative(process.cwd(), event.output[0])}`)
					break

				case 'ERROR':
					logger.warning(event.error)
					break

				case 'FATAL':
					reject(event.error)
					break
			}
		})
	})
}
