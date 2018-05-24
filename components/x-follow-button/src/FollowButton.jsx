import h from '@financial-times/x-engine';

const getFormAction = (conceptId, followPlusDigestEmail, setFollowButtonStateToSelected, CacheablePersonalisedUrl) => {
	if (followPlusDigestEmail) {
		return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
	} else if (setFollowButtonStateToSelected && CacheablePersonalisedUrl) {
		return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
	} else {
		return `/__myft/api/core/followed/concept/${conceptId}?method=put`
	}
}

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

const FollowButton = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
	cacheablePersonalisedUrl,
	csrfToken,
	extraButtonClasses,
	variant,
	alternateText,
	buttonText
}) => (
	<div>
		<form
			class="n-myft-ui n-myft-ui--follow {{extraClasses}}"
			method="POST"
			data-myft-ui="follow"
			data-concept-id={conceptId}
			action={ getFormAction(conceptId, followPlusDigestEmail, isSelected, cacheablePersonalisedUrl) }
			data-myft-ui-variant={followPlusDigestEmail ? "followPlusDigestEmail" : null } >
			<input
				data-myft-csrf-token
				value={csrfToken}
				type="hidden"
				name="token" />
			<button
				data-alternate-text={ getButtonDataAlternateText(alternateText, buttonText, isSelected, cacheablePersonalisedUrl) }
				aria-label={ getButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
				title={ getButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
				data-alternate-label={ getAlternateButtonTitle(name, isSelected, cacheablePersonalisedUrl) }
				aria-pressed="true"

				class={`${extraButtonClasses}
					n-myft-follow-button
					n-myft-follow-button--${variant}`}
				data-concept-id={conceptId}
				data-trackable-context-messaging={ followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null }
				data-trackable="follow"
				type="submit">
				{ getButtonText(buttonText, isSelected, cacheablePersonalisedUrl) }
			</button>
		</form>
	</div>
);

export {
	FollowButton
};
