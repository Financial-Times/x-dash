import { h } from '@financial-times/x-engine';
import styles from './styles/main.scss';

const getTextValue = (
	alternateText,
	buttonText,
	name,
	setFollowButtonStateToSelected,
	cacheablePersonalisedUrl,
	type
) => {
	if (alternateText) return alternateText;
	if (buttonText) return buttonText;
	const flags = setFollowButtonStateToSelected && cacheablePersonalisedUrl;

	switch (type) {
		case 'buttonText':
			return flags ? 'Added' : 'Add to MyFT';
		case 'alternateButtonText':
			return flags ? 'Add to myFT' : 'Added';
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
	setFollowButtonStateToSelected,
	cacheablePersonalisedUrl,
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
			setFollowButtonStateToSelected,
			cacheablePersonalisedUrl,
			'alternateButtonText'
		)}
		aria-label={ getTextValue(
			false,
			false,
			name,
			setFollowButtonStateToSelected,
			cacheablePersonalisedUrl,
			'buttonTitle'
		)}
		title={ getTextValue(
			false,
			false,
			name,
			setFollowButtonStateToSelected,
			cacheablePersonalisedUrl,
			'buttonTitle'
		)}
		data-alternate-label={ getTextValue(
			false,
			false,
			name,
			setFollowButtonStateToSelected,
			cacheablePersonalisedUrl,
			'alternateButtonLabel'
		)}
		aria-pressed={ setFollowButtonStateToSelected && cacheablePersonalisedUrl ? 'true' : 'false' }
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
			setFollowButtonStateToSelected,
			cacheablePersonalisedUrl,
			'buttonText'
		)}
	</button>
);

export default Button;
