import { h } from '@financial-times/x-engine'
import classNames from 'classnames'

export const FollowButton = (props) => {
	const {
		conceptNameAsButtonText = false,
		conceptId,
		conceptName,
		isFollowed,
		csrfToken,
		followPlusDigestEmail,
		onSubmit,
		variant = 'standard'
	} = props
	// 'standard' style is applied by `.x-follow-button` class (default)
	const VARIANTS = ['inverse', 'opinion', 'alphaville', 'monochrome', 'inverse-monochrome']

	const getFormAction = () => {
		if (followPlusDigestEmail) {
			return `/__myft/api/core/follow-plus-digest-email/${conceptId}?method=put`
		} else if (isFollowed) {
			return `/__myft/api/core/followed/concept/${conceptId}?method=delete`
		} else {
			return `/__myft/api/core/followed/concept/${conceptId}?method=put`
		}
	}

	const getButtonText = () => {
		if (conceptNameAsButtonText && conceptName) {
			return conceptName
		}

		return isFollowed ? 'Added' : 'Add to myFT'
	}

	const getAccessibleText = () =>
		isFollowed ? `Added ${conceptName} to myFT: click to remove` : `Add to myFT: ${conceptName}`

	return (
		<form
			method="GET"
			data-concept-id={conceptId}
			action={getFormAction()}
			onSubmit={(event) => {
				event.preventDefault()
				const detail = {
					action: isFollowed ? 'remove' : 'add',
					actorType: 'user',
					actorId: null, // myft client sets to user id from session
					relationshipName: 'followed',
					subjectType: 'concept',
					subjectId: conceptId,
					token: csrfToken
				}

				if (typeof onSubmit === 'function') {
					onSubmit(detail)
				}

				event.target.dispatchEvent(new CustomEvent('x-follow-button', { bubbles: true, detail }))
			}}
			{...(followPlusDigestEmail ? { 'data-myft-ui-variant': true } : null)}
		>
			{csrfToken && <input value={csrfToken} type="hidden" name="token" data-myft-csrf-token />}
			<button
				title={getAccessibleText()}
				aria-label={getAccessibleText()}
				aria-pressed={isFollowed ? 'true' : 'false'}
				className={classNames('x-follow-button', {
					[`x-follow-button--${variant}`]: VARIANTS.includes(variant)
				})}
				data-concept-id={conceptId}
				data-trackable-context-messaging={followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null}
				data-trackable="follow"
				type="submit"
				dangerouslySetInnerHTML={{ __html: getButtonText() }}
			/>
		</form>
	)
}
