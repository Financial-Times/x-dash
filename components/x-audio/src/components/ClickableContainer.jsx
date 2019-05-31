import { h } from '@financial-times/x-engine';
import * as PropTypes from 'prop-types';

const CLICKABLE_ELEMENTS = ['a', 'button', 'submit', 'input']

export const ClickableContainer = ({
	children,
	onClick,
	...props
}) => (
	<div
		{ ...props }
		role='button'
		tabIndex='0'
		onKeyPress={() => onClick()}
		onClick={({ target = {} }) => {
			const tagName = target.tagName || '';

			if (!CLICKABLE_ELEMENTS.includes(tagName.toLowerCase())) {
				onClick();
			}
		}}>
		{children}
	</div>
)

ClickableContainer.propTypes = {
	onClick: PropTypes.func.isRequired
}