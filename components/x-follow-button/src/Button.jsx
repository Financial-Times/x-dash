import h from '@financial-times/x-engine';

const getButtonDataAlternateText = (alternateText, buttonText, isSelected, cacheablePersonalisedUrl) => {
	return alternateText ? alternateText : buttonText ? buttonText : (isSelected && cacheablePersonalisedUrl) ? 'Add to myFT' : 'Added';
}

const getButtonTitle = (name, isSelected, cacheablePersonalisedUrl) => {
	return `${(isSelected && cacheablePersonalisedUrl) ? 'Remove' : 'Add'} ${name} from myFT`
}

const getAlternateButtonTitle = (name, isSelected, cacheablePersonalisedUrl) => {
	return `${(isSelected && cacheablePersonalisedUrl) ? 'Add' : 'Remove'} ${name} from myFT`
}

const getButtonText = (buttonText, isSelected, cacheablePersonalisedUrl) => {
	return buttonText ? buttonText : (isSelected && cacheablePersonalisedUrl) ? 'Added' : 'Add to myFT';
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
		data-alternate-text={ getButtonDataAlternateText(alternateText, buttonText, isSelected, cacheablePersonalisedUrl) }
		aria-label={ getButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
		title={ getButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
		data-alternate-label={ getAlternateButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
		aria-pressed={ isSelected && cacheablePersonalisedUrl ? "true" : "false" }
		class={`${extraButtonClasses}
			n-myft-follow-button
			n-myft-follow-button--${variant}`}
		data-concept-id={conceptId}
		data-trackable-context-messaging={ followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null }
		data-trackable="follow"
		type="submit"
        { ...props }
    >
		{ getButtonText(buttonText, isSelected, cacheablePersonalisedUrl) }
	</button>
);

export default Button;
