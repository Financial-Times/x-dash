import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import Url from './Url'
import Message from './Message'
import Buttons from './Buttons'

export default ({
	shareType,
	isGiftUrlCreated,
	isFreeArticle,
	url,
	urlType,
	giftCredits,
	monthlyAllowance,
	nextRenewalDateText,
	mailtoUrl,
	redemptionLimit,
	showCopyButton,
	nativeShare,
	invalidResponseFromApi,
	isArticleSharingUxUpdates,
	actions,
	enterpriseLimit,
	enterpriseHasCredits,
	enterpriseRequestAccess,
	enterpriseFirstTimeUser
}) => {
	const hideUrlShareElements =
		(giftCredits === 0 && shareType === ShareType.gift) ||
		((enterpriseRequestAccess || !enterpriseHasCredits) && shareType === ShareType.enterprise)
	const showUrlShareElements = !hideUrlShareElements

	return (
		<div
			className="js-gift-article__url-section x-gift-article__url-section"
			data-section-id={shareType + 'Link'}
			data-trackable={shareType + 'Link'}
		>
			{showUrlShareElements && (
				<Url
					{...{
						shareType,
						isGiftUrlCreated,
						url,
						urlType
					}}
				/>
			)}

			<Message
				{...{
					shareType,
					isGiftUrlCreated,
					isFreeArticle,
					giftCredits,
					monthlyAllowance,
					nextRenewalDateText,
					redemptionLimit,
					invalidResponseFromApi,
					isArticleSharingUxUpdates,
					enterpriseHasCredits,
					enterpriseLimit,
					enterpriseRequestAccess,
					enterpriseFirstTimeUser
				}}
			/>

			{showUrlShareElements && (
				<Buttons
					{...{
						shareType,
						isGiftUrlCreated,
						mailtoUrl,
						showCopyButton,
						nativeShare,
						actions,
						giftCredits
					}}
				/>
			)}
		</div>
	)
}
