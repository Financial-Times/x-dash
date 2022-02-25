import { h } from '@financial-times/x-engine'

export const ArticleSaveButton = (props) => {
	const getLabel = (props) => {
		if (props.saved) {
			return 'Saved to myFT'
		}

		return props.contentTitle
			? `Save ${props.contentTitle} to myFT for later`
			: 'Save this article to myFT for later'
	}

	return (
		<form
			className="x-article-save-button"
			action={`/myft/save/${props.contentId}`}
			method="GET"
			data-content-id={props.contentId}
			onSubmit={(event) => {
				event.preventDefault()
				const detail = {
					action: props.saved ? 'remove' : 'add',
					actorType: 'user',
					relationshipName: 'saved',
					subjectType: 'content',
					subjectId: props.contentId,
					token: props.csrfToken
				}

				event.target.dispatchEvent(new CustomEvent('x-article-save-button', { bubbles: true, detail }))
			}}
		>
			{props.csrfToken && <input type="hidden" name="token" value={props.csrfToken} />}
			<button
				className="x-article-save-button__button"
				type="submit"
				data-content-id={props.contentId}
				data-trackable={props.trackableId || 'save-for-later'}
				aria-label={getLabel(props)}
				aria-pressed={props.saved}
			>
				<span className="x-article-save-button__icon" />
				{props.saved ? 'Saved' : 'Save'}
			</button>
		</form>
	)
}
