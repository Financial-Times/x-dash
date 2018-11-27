import { h } from '@financial-times/x-engine';
import articleSaveStyles from './ArticleSaveButton.scss';
import classNames from 'classnames';

export const ArticleSaveButton = props => {
	const getLabel = props => {
		if (props.saved) {
			return 'Saved to myFT';
		}

		return props.contentTitle ? `Save ${props.contentTitle} to myFT for later` : 'Save this article to myFT for later';
	};

	return (
		<form
			className={classNames(articleSaveStyles.root)}
			action={`/myft/save/${props.contentId}`}
			method="GET"
			data-content-id={props.contentId}
			onSubmit={event => {
				event.preventDefault();
				const detail = {
					action: props.saved ? 'remove' : 'add',
					actorType: 'user',
					actorId: null, // myft client sets to user id from session
					relationshipName: 'saved',
					subjectType: 'content',
					subjectId: props.contentId,
					token: props.csrfToken
				};

				event.target.dispatchEvent(new CustomEvent('x-article-save-button', { bubbles: true, detail }));
			}}
		>
			{props.csrfToken && <input
				type="hidden"
				name="token"
				value={props.csrfToken}
			/>}
			<button
				className={classNames(articleSaveStyles.button)}
				type="submit"
				data-content-id={props.contentId}
				data-trackable={props.trackableId || 'save-for-later'}
				aria-label={getLabel(props)}
				aria-pressed={props.saved}
			>
				{props.saved ? 'Saved' : 'Save'}
			</button>
		</form>
	);
};
