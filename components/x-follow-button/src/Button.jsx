import { h } from '@financial-times/x-engine';
import styles from './styles/main.scss';

const getTextValue = (
	alternateText,
	buttonText,
	name,
	isSelected,
	type
) => {
	if (alternateText) return alternateText;
	if (buttonText) return buttonText;
	const flags = isSelected;

	switch (type) {
		case 'buttonText':
			return flags ? alternateText : buttonText;
		case 'alternateButtonText':
			return flags ? buttonText : alternateText;
		case 'buttonTitle':
			return flags ? 'Remove' : 'Add';
		case 'alternateButtonLabel':
			return flags ? 'Add' : 'Remove';
		default:
			return;
	}
};

const Button = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
	// Button specific props
	extraButtonClasses,
	variant,
	alternateText,
	buttonText,
	...props
}) => (
	<button
		data-alternate-text={ getTextValue(
			alternateText,
			false,
			name,
			isSelected,
			'alternateButtonText'
		)}
		aria-label={ getTextValue(
			false,
			false,
			name,
			isSelected,
			'buttonTitle'
		)}
		title={ getTextValue(
			false,
			false,
			name,
			isSelected,
			'buttonTitle'
		)}
		data-alternate-label={ getTextValue(
			false,
			false,
			name,
			isSelected,
			'alternateButtonLabel'
		)}
		aria-pressed={ isSelected ? 'true' : 'false' }
		className={ `${extraButtonClasses ? extraButtonClasses : ''}
				${styles['n-myft-follow-button']}
				${variant ? ` n-myft-follow-button--${variant}` : ''}` }
		data-concept-id={conceptId}
		data-trackable-context-messaging={
			followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null
		}
		data-trackable="follow"
		type="submit"
		{ ...props }>
		{ getTextValue(
			false,
			buttonText,
			name,
			isSelected,
			'buttonText'
		)}
	</button>
);

export default Button;
