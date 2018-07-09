import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Input from './Input';
import Button from './Button';

import styles from './styles/main.scss';

const followButtonActions = withActions((props) => ({
	onSubmitAction(event) {
		event.preventDefault();
		console.log('the follow button was pressed');
		console.log('the default event was prevented');
		console.log(`the action suppose to trigger the submission of the form with "${event.target.method}" method and "${event.target.action}" action`);
	},
	onClickAction(event) {
		event.preventDefault();
		return ({isSelected}) => ({
			isSelected: !isSelected
		})
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

const BaseButton = ({
	conceptId,
	csrfToken,
	followPlusDigestEmail,
	isSelected,
	extraButtonClasses,
	variant,
	alternateText,
	buttonText,
	actions,
	name
}) => (
	<form
		className="n-myft-ui n-myft-ui--follow {{extraClasses}}"
		method="GET"
		data-myft-ui="follow"
		data-concept-id={conceptId}
		action={ getFormAction(conceptId, followPlusDigestEmail, isSelected) }
		onSubmit={ actions.onSubmitAction }
		{ ...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null) }>
		<Input value={csrfToken}
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

const FollowButton = followButtonActions(BaseButton);

export {
	FollowButton
};
