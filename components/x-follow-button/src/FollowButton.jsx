import h from '@financial-times/x-engine';

import Input from './Input';
import Button from './Button';

const getFormAction = (conceptId, followPlusDigestEmail, setFollowButtonStateToSelected, CacheablePersonalisedUrl) => {
	if (followPlusDigestEmail) {
		return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
	} else if (setFollowButtonStateToSelected && CacheablePersonalisedUrl) {
		return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
	} else {
		return `/__myft/api/core/followed/concept/${conceptId}?method=put`
	}
}

const FollowButton = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
	cacheablePersonalisedUrl,
	csrfToken,
	// Button specific props
	extraButtonClasses,
	variant,
	alternateText,
	buttonText,
}) => (
	<div>
		<form
			class="n-myft-ui n-myft-ui--follow {{extraClasses}}"
			method="POST"
			data-myft-ui="follow"
			data-concept-id={conceptId}
			action={ getFormAction(conceptId, followPlusDigestEmail, isSelected, cacheablePersonalisedUrl) }
			data-myft-ui-variant={ followPlusDigestEmail ? "followPlusDigestEmail" : null } >
			<Input value={csrfToken}
				type='hidden'
				name='token'
				data-myft-csrf-token />
			<Button conceptId={conceptId}
				followPlusDigestEmail={followPlusDigestEmail}
				isSelected={isSelected}
				cacheablePersonalisedUrl={cacheablePersonalisedUrl}
				extraButtonClasses={extraButtonClasses}
				variant={variant}
				alternateText={alternateText}
				buttonText={buttonText} />
		</form>
	</div>
);

export {
	FollowButton
};
