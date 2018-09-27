import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import articleSaveStyles from './ArticleSaveButton.scss';
import classNames from 'classnames';

export const articleSaveActions = withActions(props => ({
	triggerSave(rootElement) {
		const detail = {
			action: props.saved ? 'remove' : 'add',
			actorType: 'user',
			actorId: null, // client sets to user id from session
			relationshipName: 'saved',
			subjectType: 'content',
			subjectId: props.contentId,
			token: props.csrfToken
		};

		rootElement.dispatchEvent(new CustomEvent('x-article-save-button', { bubbles: true, detail }));
	},
	saved() {
		return { saved: true };
	},
	unsaved() {
		return { saved: false };
	}
}));

export const BaseArticleSaveButton = props => {
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
				props.actions.triggerSave(event.target);
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

export const ArticleSaveButton = articleSaveActions(BaseArticleSaveButton);
