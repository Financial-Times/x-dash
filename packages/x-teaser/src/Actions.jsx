const h = require('@financial-times/x-engine');

/**
 * Render Action
 * @param {String|ReactElement} action
 * @returns {ReactElement}
 */
const renderAction = (action) => {
	// Allow parent components to pass raw HTML strings
	if (typeof action === 'string') {
		return <span dangerouslySetInnerHTML={{ __html: action }} />;
	} else {
		return action;
	}
};

module.exports = ({ actions }) => (
	actions ? <div class="o-teaser__actions">{renderAction(actions)}</div> : null
);
