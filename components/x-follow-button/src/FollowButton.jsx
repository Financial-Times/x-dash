import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Input from './Input';
import Button from './Button';

import styles from './styles/main.scss';

const followButtonActions = withActions((props) => ({
	onSubmitAction(event) {
		event.preventDefault();
		console.log('follow button pressed');
		console.log(`the action triggered the submission of the form with "${event.target.method}" method and "${event.target.action}" action`);
	}
}));

const getFormAction = (conceptId, followPlusDigestEmail, setFollowButtonStateToSelected, CacheablePersonalisedUrl) => {
	if (followPlusDigestEmail) {
		return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
	} else if (setFollowButtonStateToSelected && CacheablePersonalisedUrl) {
		return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
	} else {
		return `/__myft/api/core/followed/concept/${conceptId}?method=put`
	}
};

const BaseButton = ({
	conceptId,
	csrfToken,
	followPlusDigestEmail,
	setFollowButtonStateToSelected,
	cacheablePersonalisedUrl,
	// Button specific props
	extraButtonClasses,
	variant,
	alternateText,
	buttonText,
	actions
}) => (
	<form
		className="n-myft-ui n-myft-ui--follow {{extraClasses}}"
		method="GET"
		data-myft-ui="follow"
		data-concept-id={conceptId}
		action={ getFormAction(conceptId, followPlusDigestEmail, setFollowButtonStateToSelected, cacheablePersonalisedUrl) }
		onSubmit={ actions.onSubmitAction }
		{ ...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null) }>
		<Input value={csrfToken}
			type='hidden'
			name='token'
			data-myft-csrf-token />
		<Button conceptId={ conceptId }
			followPlusDigestEmail={ followPlusDigestEmail }
			setFollowButtonStateToSelected={ setFollowButtonStateToSelected }
			cacheablePersonalisedUrl={ cacheablePersonalisedUrl }
			extraButtonClasses={ extraButtonClasses }
			variant={ variant }
			alternateText={ alternateText }
			buttonText={ buttonText } />
	</form>
);

const FollowButton = followButtonActions(BaseButton);

export {
	FollowButton
};
