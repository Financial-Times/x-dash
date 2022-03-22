import { h } from '@financial-times/x-engine'
import Title from './Title'
import RadioButtonsSection from './RadioButtonsSection'
import UrlSection from './UrlSection'
import MobileShareButtons from './MobileShareButtons'
import CopyConfirmation from './CopyConfirmation'

export default (props) => (
	<div className="x-gift-article">
		<form name="gift-form" className="x-gift-article__form">
			<div role="group" arialabelledby="gift-article-title">
				<Title {...props} />

				{!props.isFreeArticle && (
					<RadioButtonsSection
						shareType={props.shareType}
						isArticleSharingUxUpdates={props.isArticleSharingUxUpdates}
						showGiftUrlSection={props.actions.showGiftUrlSection}
						showEnterpriseUrlSection={props.actions.showEnterpriseUrlSection}
						showNonGiftUrlSection={props.actions.showNonGiftUrlSection}
						enterpriseLimit={props.enterpriseLimit}
						enterpriseHasCredits={props.enterpriseHasCredits}
						enterpriseRequestAccess={props.enterpriseRequestAccess}
						enterpriseAlert={!props.enterpriseHasCredits && !props.enterpriseRequestAccess}
						enterpriseEnabled={props.enterpriseEnabled}
					/>
				)}

				<UrlSection {...props} />
			</div>
		</form>

		{props.showCopyConfirmation && (
			<CopyConfirmation
				hideCopyConfirmation={props.actions.hideCopyConfirmation}
				isArticleSharingUxUpdates={props.isArticleSharingUxUpdates}
			/>
		)}

		{props.showMobileShareLinks && <MobileShareButtons mobileShareLinks={props.mobileShareLinks} />}
	</div>
)
