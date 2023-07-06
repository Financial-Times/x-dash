import { h } from '@financial-times/x-engine'
import { ShareType } from '../lib/constants'

export const CreateLinkButton = ({ shareType, actions, enterpriseEnabled }) => {
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
		actions.initOShare('#social-share-buttons')
	}
	return (
		<button
			id="create-link-button"
			className={`o-buttons o-buttons--big o-buttons--primary share-article-dialog__create-link-button ${
				enterpriseEnabled ? 'o-buttons--professional' : ''
			}`}
			onClick={createLinkHandler}
		>
			Create link
		</button>
	)
}
