const h = require('@financial-times/x-engine');

/**
 * Render
 * @param {String|ReactElement} action
 * @returns {ReactElement}
 */
const render = (action) => {
	// Allow parent components to pass raw HTML strings
	if (typeof action === 'string') {
		return <span dangerouslySetInnerHTML={{ __html: action }} />;
	} else {
		return action;
	}
};

module.exports = ({ customSlot }) => (
	customSlot ? <div class="o-teaser__action">{render(customSlot)}</div> : null
);
