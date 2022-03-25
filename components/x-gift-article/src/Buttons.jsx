import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({
	shareType,
	isGiftUrlCreated,
	mailtoUrl,
	showCopyButton,
	nativeShare,
	actions,
	giftCredits
}) => {
	if (isGiftUrlCreated || shareType === ShareType.nonGift) {
		if (nativeShare) {
			return (
				<div className="x-gift-article__buttons">
					<button
						className="js-copy-link x-gift-article__button x-gift-article-button--gap"
						type="button"
						onClick={actions.shareByNativeShare}
					>
						Share link
					</button>
				</div>
			)
		}

		return (
			<div className="x-gift-article__buttons">
				{showCopyButton && (
					<button
						className="js-copy-link x-gift-article__button x-gift-article-button--gap"
						type="button"
						onClick={
							shareType === ShareType.gift
								? actions.copyGiftUrl
								: shareType === ShareType.enterprise
								? actions.copyEnterpriseUrl
								: actions.copyNonGiftUrl
						}
						aria-label="Copy the gift article link to your clipboard"
					>
						Copy link
					</button>
				)}
				<a
					className="x-gift-article__button"
					href={mailtoUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={
						shareType === ShareType.gift
							? actions.emailGiftUrl
							: shareType === ShareType.enterprise
							? actions.emailEnterpriseUrl
							: actions.emailNonGiftUrl
					}
				>
					Email link <span className="x-gift-article--visually-hidden">to Share this article</span>
				</a>
			</div>
		)
	}

	return (
		<div className="x-gift-article__buttons">
			<button
				className="x-gift-article__button"
				disabled={!giftCredits}
				type="button"
				onClick={shareType === ShareType.enterprise ? actions.createEnterpriseUrl : actions.createGiftUrl}
			>
				Create {shareType === ShareType.enterprise ? 'enterprise' : 'gift'} link
			</button>
		</div>
	)
}
