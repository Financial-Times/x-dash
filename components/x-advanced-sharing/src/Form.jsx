import { h } from '@financial-times/x-engine'
import Title from './Title'
import RadioButtonsSection from './RadioButtonsSection'
import UrlSection from './UrlSection'
import CopyConfirmation from './CopyConfirmation'
import styles from './AdvancedSharing.scss'

export default (props) => (
	<div className={styles.container}>
		<form name="gift-form" className={styles['share-form']}>
			<div role="group" arialabelledby="gift-article-title">
				<Title userOrganisation={props.userOrganisation} />

				{!props.isFreeArticle && (
					<RadioButtonsSection
						shareType={props.shareType}
						showAdvancedSharingUrlSection={props.actions.showAdvancedSharingUrlSection}
						showNonGiftUrlSection={props.actions.showNonGiftUrlSection}
						userOrganisation={props.userOrganisation}
					/>
				)}

				<UrlSection {...props} />
			</div>
		</form>

		{props.showCopyConfirmation && (
			<CopyConfirmation hideCopyConfirmation={props.actions.hideCopyConfirmation} />
		)}
	</div>
)
