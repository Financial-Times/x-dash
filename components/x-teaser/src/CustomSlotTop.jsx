import { h } from '@financial-times/x-engine'

/**
 * Render
 * @param {String|ReactElement} slot
 * @returns {ReactElement}
 */
const render = (slot) => {
	// Allow parent components to pass raw HTML strings
	if (typeof slot === 'string') {
		return <span dangerouslySetInnerHTML={{ __html: slot }} />
	} else {
		return slot
	}
}

export default ({ customSlotTop }) => (customSlotTop ? render(customSlotTop) : null)
