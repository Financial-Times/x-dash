import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Button from './Button';

const followButtonActions = withActions(() => ({
	onSubmitAction(event) {
		event.preventDefault();
	},
	onClickAction() {
		return ({isSelected}) => ({
			isSelected: !isSelected
		});
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
	extraButtonClasses,
	extraFormClasses,
	variant,
	alternateText,
	buttonText,
	actions,
	name
}) => (
	<form
		className={ extraFormClasses }
		method="GET"
		data-myft-ui="follow"
		data-concept-id={conceptId}
		action={ getFormAction(conceptId, followPlusDigestEmail, isSelected) }
		onSubmit={ actions.onSubmitAction }
		{ ...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null) }>
		<input value={ csrfToken }
			type='hidden'
			name='token'
			data-myft-csrf-token />
		<Button conceptId={ conceptId }
			followPlusDigestEmail={ followPlusDigestEmail }
			isSelected={ isSelected }
			extraButtonClasses={ extraButtonClasses }
			variant={ variant }
			alternateText={ alternateText }
			buttonText={ buttonText }
			name={ name }
			onClick={ event => actions.onClickAction(event) }/>
	</form>
);

const FollowButton = followButtonActions(BaseFollowButton);

export {
	FollowButton,
	followButtonActions,
	BaseFollowButton,
};
