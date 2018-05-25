import h from '@financial-times/x-engine';

const getTextValue = (alternateText, buttonText, name, isSelected, cacheablePersonalisedUrl, type) => {
	if (alternateText) return alternateText;
	if (buttonText) return buttonText;
	const flags = isSelected && cacheablePersonalisedUrl;
	
	switch (type) {
		case 'buttonText': return (flags) ? 'Added' : 'Add to MyFT';
		case 'alternateButtonText': return (flags) ? 'Add to myFT' : 'Added';
		case 'buttonTitle': return (flags) ? 'Remove' : 'Add';
		case 'alternateButtonTitle': return (flags) ? 'Add' : 'Remove';
		default: return;
	}
}

const Button = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
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
				buttonText,
				name,
				isSelected,
				cacheablePersonalisedUrl,
				'alternateButtonText'
			) }
		aria-label={ getTextValue(
				alternateText,
				buttonText,
				name,
				isSelected,
				cacheablePersonalisedUrl,
				'buttonTitle'
			) }
		title={ getTextValue(alternateText,
			buttonText,
			name,
			isSelected,
			cacheablePersonalisedUrl,
			'buttonTitle'
		) }
		data-alternate-label={ getTextValue(alternateText,
			buttonText,
			name,
			isSelected,
			cacheablePersonalisedUrl,
			'alternteButtonTitle'
		) }
		aria-pressed={ isSelected && cacheablePersonalisedUrl ? "true" : "false" }
		class={`${extraButtonClasses}
			n-myft-follow-button
			n-myft-follow-button--${variant}`
		}
		data-concept-id={ conceptId }
		data-trackable-context-messaging={ followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null }
		data-trackable="follow"
		type="submit"
        { ...props }
    >
		{ getTextValue(alternateText,
			buttonText,
			name,
			isSelected,
			cacheablePersonalisedUrl,
			'buttonText'
			) }
	</button>
);

export default Button;
