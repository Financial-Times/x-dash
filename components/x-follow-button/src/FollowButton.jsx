import { h } from '@financial-times/x-engine';
import classNames from 'classnames';
import styles from './styles/main.scss';

export const FollowButton = (props) => {
	const {
		conceptNameAsButtonText = false,
		conceptId,
		conceptName,
		isFollowed,
		csrfToken,
		followPlusDigestEmail,
		variant
	} = props;
	const VARIANTS = ['standard', 'inverse', 'opinion', 'monochrome'];

	const getFormAction = () => {
		if (followPlusDigestEmail) {
			return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
		} else if (isFollowed) {
			return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
		} else {
			return `/__myft/api/core/followed/concept/${conceptId}?method=put`
		}
	};

	const getButtonText = () => {
		if (conceptNameAsButtonText) {
			return conceptName;
		}

		return isFollowed ? `Remove from MyFT` : `Add to MyFT`;
	};

	const getAccessibleText = () => isFollowed ? `Remove ${conceptName} from MyFT` : `Add ${conceptName} to MyFT`;

	return (
		<form
			method="GET"
			data-concept-id={conceptId}
			action={getFormAction()}
			onSubmit={event => {
				event.preventDefault();
				const detail = {
					action: isFollowed ? 'remove' : 'add',
					actorType: 'user',
					actorId: null, // myft client sets to user id from session
					relationshipName: 'followed',
					subjectType: 'concept',
					subjectId: conceptId,
					token: csrfToken
				};

				event.target.dispatchEvent(new CustomEvent('x-follow-button', { bubbles: true, detail }));
			}}
			{...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null)}>
			{csrfToken && <input value={csrfToken}
				type='hidden'
				name='token'
				data-myft-csrf-token/>}
			<button
				title={getAccessibleText()}
				aria-label={getAccessibleText()}
				aria-pressed={isFollowed ? 'true' : 'false'}
				className={classNames(styles['button'], {
					[styles[`button--${variant}`]]: VARIANTS.includes(variant)
				})}
				data-concept-id={conceptId}
				data-trackable-context-messaging={
					followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null
				}
				data-trackable="follow"
				type="submit"
				dangerouslySetInnerHTML={{__html: getButtonText()}}
			/>
		</form>
	);
};
