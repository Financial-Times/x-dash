import { h } from '@financial-times/x-engine'
import { SharedLinkTypeSelector } from './SharedLinkTypeSelector'
import { ShareType } from '../lib/constants'
import CopyConfirmation from '../CopyConfirmation'

export const GiftLinkSection = (props) => {
	const {
		isGiftUrlCreated,
		urlType,
		url,
		actions,
		isArticleSharingUxUpdates,
		shareType,
		showCopyConfirmation,
		isNonGiftUrlShortened,
		enterpriseEnabled
	} = props

	const createLinkHandler = async () => {
		switch (shareType) {
			case ShareType.gift:
				await actions.createGiftUrl()
				break
			case ShareType.nonGift:
				await actions.shortenNonGiftUrl()
				break
			default:
		}
	}

	const copyLinkHandler = (event) => {
		switch (shareType) {
			case ShareType.gift:
				actions.copyGiftUrl(event)
				break
			case ShareType.nonGift:
				actions.copyNonGiftUrl(event)
				break
			default:
		}
	}

	if (isGiftUrlCreated || (shareType === ShareType.nonGift && isNonGiftUrlShortened)) {
		return (
			<div
				className="o-forms-input o-forms-input--text o-forms-input--suffix js-gift-article__url-section"
				data-section-id={shareType + 'Link'}
				data-trackable={shareType + 'Link'}
			>
				<input id="share-link" type="text" name={urlType} value={url} readOnly />
				<button
					className={`o-buttons o-buttons--big o-buttons--primary ${
						enterpriseEnabled ? 'o-buttons--professional' : ''
					}`}
					aria-label="Copy link of the gift article to your clipboard"
					onClick={copyLinkHandler}
				>
					Copy Link
				</button>
				{showCopyConfirmation && (
					<CopyConfirmation
						hideCopyConfirmation={actions.hideCopyConfirmation}
						isArticleSharingUxUpdates={isArticleSharingUxUpdates}
					/>
				)}
			</div>
		)
	}

	return (
		<div>
			<SharedLinkTypeSelector {...props} />
			<button
				id="create-link-button"
				className={`o-buttons o-buttons--big o-buttons--primary share-article-dialog__create-link-button ${
					enterpriseEnabled ? 'o-buttons--professional' : ''
				}`}
				onClick={createLinkHandler}
			>
				Create link
			</button>
		</div>
	)
}
