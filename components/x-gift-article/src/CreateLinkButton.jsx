import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import oShare from '@financial-times/o-share/main'
import { canShareWithNonSubscribers, isNonSubscriberOption } from './lib/highlightsHelpers'

export const CreateLinkButton = (props) => {
	const { shareType, actions, enterpriseEnabled, isFreeArticle, isRegisteredUser } = props

	const _canShareWithNonSubscribers = canShareWithNonSubscribers(props)
	const _isNonSubscriberOption = isNonSubscriberOption(props)

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
		new oShare(document.querySelector('#social-share-buttons'))
	}
	return (
		<button
			disabled={!_canShareWithNonSubscribers && _isNonSubscriberOption && !isFreeArticle && !isRegisteredUser}
			id="create-link-button"
			className="o3-button o3-button--primary  share-article-dialog__create-link-button"
			data-o3-theme={enterpriseEnabled ? 'mono' : ''}
			data-trackable={shareType + 'Link'}
			onClick={createLinkHandler}
		>
			Get sharing link
		</button>
	)
}
