import { h } from '@financial-times/x-engine';
import styles from './ArticleSaveButton.css';
import classNames from 'classnames';

const ArticleSaveButton = props => {
	const className = classNames(
		styles['article-save-button'],
		{
			[styles['article-save-button--saved']]: props.saved
		}
	);

	return (
		<form
			action={props.action}
			method={props.method}
			className={className}
			data-content-id={props.contentId}
		>
			{props.csrfToken && <input
				type="hidden"
				name="token"
				value={props.csrfToken}
			/>}
			<button
				type="submit"
				data-content-id={props.contentId}
			>
				<span>{props.saved ? 'Saved' : 'Save'}</span>
			</button>
		</form>
	);
};

export {
	ArticleSaveButton
};
