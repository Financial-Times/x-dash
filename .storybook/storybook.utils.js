import * as knobsAddon from '@storybook/addon-knobs'

const defaultKnobs = () => ({})

/**
 * Create Props
 * @param {{ [key: string]: any }} defaultData
 * @param {String[]} allowedKnobs
 * @param {Function} hydrateKnobs
 */
function createProps(defaultData, allowedKnobs = [], hydrateKnobs = defaultKnobs) {
	// Inject knobs add-on into given dependency container
	const knobs = hydrateKnobs(defaultData, knobsAddon)
	// Mix the available knob props into default data
	const mixedProps = { ...defaultData, ...knobs }

	if (allowedKnobs.length === 0) {
		return mixedProps
	}

	return allowedKnobs.reduce((map, prop) => {
		if (mixedProps.hasOwnProperty(prop)) {
			const value = mixedProps[prop]

			// Knobs are functions which need calling to register them
			if (typeof value === 'function') {
				map[prop] = value()
			} else {
				map[prop] = value
			}
		}

		return map
	}, {})
}

export default createProps
