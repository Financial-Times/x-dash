import { h } from '@financial-times/x-engine'
import { SharedLinkTypeSelector } from './SharedLinkTypeSelector'
import { ShareType } from '../lib/constants'
import { UrlSection } from './UrlSection'

export const GiftLinkSection = (props) => {
	const { isGiftUrlCreated, actions, shareType, isNonGiftUrlShortened, enterpriseEnabled } = props

	const createLinkHandler = async () => {
		switch (shareType) {
			case ShareType.gift:
				await actions.createGiftUrl()
				break
			case ShareType.nonGift:
				await actions.shortenNonGiftUrl()
				break
			case ShareType.enterprise:
				await actions.createEnterpriseUrl()
				break
			default:
		}
	}

	// when the gift url is created or the non-gift url is shortened, show the url section
	if (isGiftUrlCreated || (shareType === ShareType.nonGift && isNonGiftUrlShortened)) {
		return <UrlSection {...props} />
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
