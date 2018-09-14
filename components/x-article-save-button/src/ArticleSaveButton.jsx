import { h } from '@financial-times/x-engine';
import styles from './ArticleSaveButton.scss';
import classNames from 'classnames';

const getLabel = props => {
	if (props.saved) {
		return 'Saved to myFT';
	}

	return props.contentTitle ? `Save ${props.contentTitle} to myFT for later` : 'Save this article to myFT for later';
};

const ArticleSaveButton = props => {
	const className = classNames(
		styles['article-save-button'],
		{
			[styles['article-save-button--saved']]: props.saved
		}
	);

	return (
		<form
			className={className}
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
				className={classNames(styles['article-save-button__button'])}
				type="submit"
				data-content-id={props.contentId}
				data-trackable={props.trackableId || 'save-for-later'}
				aria-label={getLabel(props)}
				aria-pressed={props.saved}
				aria-selected={props.saved}
			>
				{props.saved ? 'Saved' : 'Save'}
			</button>
		</form>
	);
};

export {
	ArticleSaveButton
};
