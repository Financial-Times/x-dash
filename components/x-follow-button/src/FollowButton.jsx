import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Button from './Button';

const followButtonActions = withActions(initialProps => ({
	triggerFollowUnfollow(rootElement) {
		return currentProps => {
			const detail = {
				action: currentProps.isSelected ? 'remove' : 'add',
				actorType: 'user',
				actorId: null, // myft client sets to user id from session
				relationshipName: 'followed',
				subjectType: 'concept',
				subjectId: initialProps.conceptId,
				token: initialProps.csrfToken
			};

			rootElement.dispatchEvent(new CustomEvent('x-follow-button', { bubbles: true, detail }));
		};
	},
	followed() {
		return { isSelected: true };
	},
	unfollowed() {
		return { isSelected: false };
	}
}));

const getFormAction = (conceptId, followPlusDigestEmail, isSelected) => {
	if (followPlusDigestEmail) {
		return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
	} else if (isSelected) {
		return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
	} else {
		return `/__myft/api/core/followed/concept/${conceptId}?method=put`
	}
};

const BaseFollowButton = ({
	conceptId,
	csrfToken,
	followPlusDigestEmail,
	isSelected,
	variant,
	altButtonText,
	buttonText,
	actions,
	name
}) => (
	<form
		method="GET"
		data-concept-id={conceptId}
		action={ getFormAction(conceptId, followPlusDigestEmail, isSelected) }
		onSubmit={event => {
			event.preventDefault();
			actions.triggerFollowUnfollow(event.target);
		}}
		{ ...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null) }>
		<input value={ csrfToken }
			type='hidden'
			name='token'
			data-myft-csrf-token />
		<Button conceptId={ conceptId }
			followPlusDigestEmail={ followPlusDigestEmail }
			isSelected={ isSelected }
			variant={ variant }
			altButtonText={ altButtonText || 'Added' }
			buttonText={ buttonText || 'Add to myFT' }
			name={ name || 'unnamed' }
		/>
	</form>
);

BaseFollowButton.displayName = 'BaseFollowButton';

const FollowButton = followButtonActions(BaseFollowButton);

export {
	FollowButton,
	followButtonActions,
	BaseFollowButton,
};
