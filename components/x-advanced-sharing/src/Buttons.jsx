import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './AdvancedSharing.scss'

const ButtonsClassName = styles.buttons

const ButtonClassNames = styles['buttonBaseStyle']

const ButtonWithGapClassNames = [ButtonClassNames, 'js-copy-link', styles['button--with-gap']].join(' ')

export default ({
	shareType,
	isGiftUrlCreated,
	mailtoUrl,
	showCopyButton,
	nativeShare,
	actions,
	giftCredits
}) => {
	if (isGiftUrlCreated || shareType === ShareType.external) {
		if (nativeShare) {
			return (
				<div className={ButtonsClassName}>
					<button className={ButtonWithGapClassNames} type="button" onClick={actions.shareByNativeShare}>
						Share link
					</button>
				</div>
			)
		}

		return (
			<div className={ButtonsClassName}>
				{showCopyButton && (
					<button
						className={ButtonWithGapClassNames}
						type="button"
						onClick={shareType === ShareType.internal ? actions.copyGiftUrl : actions.copyNonGiftUrl}
						aria-label="Copy the gift article link to your clipboard">
						Copy link
					</button>
				)}
				<a
					className={ButtonClassNames}
					href={mailtoUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={shareType === ShareType.internal ? actions.emailGiftUrl : actions.emailNonGiftUrl}>
					Email link <span className={styles['visually-hidden']}>to Share this article</span>
				</a>
			</div>
		)
	}

	return (
		<div className={ButtonsClassName}>
			<button
				className={ButtonClassNames}
				disabled={!giftCredits}
				type="button"
				onClick={actions.createGiftUrl}>
				Create gift link
			</button>
		</div>
	)
}
