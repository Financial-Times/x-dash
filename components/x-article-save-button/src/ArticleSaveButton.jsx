import { h } from '@financial-times/x-engine';
import articleSaveStyles from './styles.scss';
import classNames from 'classnames';

const getLabel = (isSaved, contentTitle) => {
	let label;

	if (isSaved) {
		label = 'Saved to myFT';
	} else {
		label = contentTitle ? `Save ${contentTitle} to myFT for later` : 'Save this article to myFT for later';
	}

	return label;
};

export const ArticleSaveButton = ({
	isSaved,
	csrfToken,
	contentId,
	trackableId,
	contentTitle,
	className,
	onSubmit = () => null,
}) => {
	return (
		<form
			className={classNames(articleSaveStyles.root, className)}
			action={`/myft/save/${contentId}`}
			method="GET"
			data-content-id={contentId}
			onSubmit={event => {
				event.preventDefault();

				const detail = {
					action: isSaved ? 'remove' : 'add',
					actorType: 'user',
					relationshipName: 'saved',
					subjectType: 'content',
					subjectId: contentId,
					token: csrfToken
				};

				onSubmit(detail);

				// This is for backwards compatibility in ft.com, remove when ft.com updates their implementation
				// to use the new (onClick prop) way
				event.target.dispatchEvent(new CustomEvent('x-article-save-button', { bubbles: true, detail }));
			}}
		>
			{csrfToken && <input
				type="hidden"
				name="token"
				value={csrfToken}
			/>}
			<button
				className={classNames(articleSaveStyles.button)}
				type="submit"
				data-content-id={contentId}
				data-trackable={trackableId || 'save-for-later'}
				aria-label={getLabel(isSaved, contentTitle)}
				aria-pressed={isSaved}
			>
				<span className={classNames(articleSaveStyles.icon)} />
			</button>
		</form>
	);
};
