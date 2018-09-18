import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import articleSaveStyles from './ArticleSaveButton.scss';
import classNames from 'classnames';

const getLabel = props => {
	if (props.saved) {
		return 'Saved to myFT';
	}

	return props.contentTitle ? `Save ${props.contentTitle} to myFT for later` : 'Save this article to myFT for later';
};

export const articleSaveActions = withActions({
	saved() {
		return { saved: true };
	},
	unsaved() {
		return { saved: false };
	}
});

export const BaseArticleSaveButton = props => {
	return (
		<form
			className={classNames(articleSaveStyles.root)}
			action={props.action}
			method={props.method}
			data-content-id={props.contentId}
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
				onClick={event => {
					event.preventDefault();
					props.saved ? props.actions.unsaved() : props.actions.saved();
				}}
			>
				{props.saved ? 'Saved' : 'Save'}
			</button>
		</form>
	);
};

export const ArticleSaveButton = articleSaveActions(BaseArticleSaveButton);
