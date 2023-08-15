import { h } from '@financial-times/x-engine'
import CopyConfirmation from './CopyConfirmation'
import { ShareType } from './lib/constants'
import { SocialShareButtons } from './SocialShareButtons'

export const UrlSection = (props) => {
	const { urlType, url, actions, shareType, showCopyConfirmation, enterpriseEnabled } = props

	const copyLinkHandler = (event) => {
		switch (shareType) {
			case ShareType.gift:
				actions.copyGiftUrl(event)
				break
			case ShareType.enterprise:
				actions.copyEnterpriseUrl(event)
				break
			case ShareType.nonGift:
				actions.copyNonGiftUrl(event)
				break
			default:
		}
	}

	return (
		<div>
			<div
				className="o-forms-input o-forms-input--text o-forms-input--suffix js-gift-article__url-section"
				data-section-id={shareType + 'Link'}
				data-trackable="copy-link"
			>
				<input id="share-link" type="text" name={urlType} value={url} readOnly />
				<button
					className={`o-buttons o-buttons--big o-buttons--primary ${
						enterpriseEnabled ? 'o-buttons--professional' : ''
					}`}
					aria-label="Copy link of the gift article to your clipboard"
					onClick={copyLinkHandler}
				>
					Copy link
				</button>
				{showCopyConfirmation && <CopyConfirmation hideCopyConfirmation={actions.hideCopyConfirmation} />}
			</div>
			<SocialShareButtons {...props} />
		</div>
	)
}
