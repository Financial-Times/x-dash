import { h } from '@financial-times/x-engine'
import { SharedLinkTypeSelector } from './SharedLinkTypeSelector'
import { ShareType } from './lib/constants'
import { UrlSection } from './UrlSection'
import { CreateLinkButton } from './CreateLinkButton'
import { FreeArticleAlert } from './FreeArticleAlert'
import { ReceivedHighlightsAlert } from './ReceivedHighlightsAlert'
import { IncludeHighlights } from './IncludeHighlights'

export const GiftLinkSection = (props) => {
	const {
		isGiftUrlCreated,
		shareType,
		isNonGiftUrlShortened,
		showFreeArticleAlert,
		showHighlightsRecipientMessage
	} = props

	// when the gift url is created or the non-gift url is shortened, show the url section
	if (
		isGiftUrlCreated ||
		(shareType === ShareType.nonGift && isNonGiftUrlShortened && !showFreeArticleAlert)
	) {
		return <UrlSection {...props} />
	}

	return (
		<div>
			{showFreeArticleAlert && <FreeArticleAlert />}
			{!showFreeArticleAlert && <SharedLinkTypeSelector {...props} />}
			{showHighlightsRecipientMessage && <ReceivedHighlightsAlert {...props} />}
			<IncludeHighlights {...props} />

			<CreateLinkButton {...props} />
		</div>
	)
}
