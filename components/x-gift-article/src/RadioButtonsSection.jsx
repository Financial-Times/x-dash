import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import styles from './GiftArticle.scss'

const radioSectionClassNames = [
	styles['o-forms-input'],
	styles['o-forms-input--radio-round'],
	styles['o-forms-field'],
	styles['radio-button-section']
].join(' ')

export default ({
	shareType,
	showGiftUrlSection,
	showEnterpriseUrlSection,
	isArticleSharingUxUpdates,
	showNonGiftUrlSection,
	enterpriseEnabled = false,
	enterpriseHasCredits = true,
	enterpriseLimit = 100 //if limit is not set enterprise will show 100 for default (value used for activation)
}) => (
	<div className={radioSectionClassNames} role="group" aria-labelledby="article-share-options">
		<span className={styles['share-option-title']} id="article-share-options">
			Article share options
		</span>
		<label htmlFor="giftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="giftLink"
				id="giftLink"
				checked={shareType === ShareType.gift}
				onChange={showGiftUrlSection}
			/>
			{isArticleSharingUxUpdates ? (
				<span className={styles['o-forms-input__label']}>
					Gift to <strong>anyone</strong> (uses <strong>1 credit</strong>)
				</span>
			) : (
				<span className={styles['o-forms-input__label']}>
					with up to <strong>3 people</strong> (uses 1 gift credit)
				</span>
			)}
		</label>

		{enterpriseEnabled === true && (
			<label htmlFor="enterpriseLink">
				<input
					type="radio"
					name="gift-form__radio"
					value="enterpriseLink"
					id="enterpriseLink"
					checked={shareType === ShareType.enterprise}
					onChange={showEnterpriseUrlSection}
				/>
				<span className={styles['o-forms-input__label']}>
					with up to <strong>{enterpriseLimit} people</strong>{' '}
					<span className={[styles['o-labels'], styles['o-labels--content-premium']].join(' ')}>
						Enterprise
					</span>
					{!enterpriseHasCredits && <span className={styles['o-icons__enterprise-no-credits']}></span>}
				</span>
			</label>
		)}

		<label htmlFor="nonGiftLink">
			<input
				type="radio"
				name="gift-form__radio"
				value="nonGiftLink"
				id="nonGiftLink"
				checked={shareType === ShareType.nonGift}
				onChange={showNonGiftUrlSection}
			/>
			{isArticleSharingUxUpdates ? (
				<span className={styles['o-forms-input__label']}>
					Share with <strong>other FT subscribers</strong>
				</span>
			) : (
				<span className={styles['o-forms-input__label']}>
					with <strong>other FT subscribers</strong>
				</span>
			)}
		</label>
	</div>
)
