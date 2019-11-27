import { h } from '@financial-times/x-engine';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';
import MobileShareButtons from './MobileShareButtons';
import CopyConfirmation from './CopyConfirmation';
import styles from './GiftArticle.scss';

const formClassNames = [
	styles["share-form"]
].join(' ');

export default (props) => (
	<div className={ styles.container }>
		<form name="gift-form" className={ formClassNames }>
			<div role="group"
				arialabelledby="gift-article-title">

				<Title title={ props.title }/>

				{ !props.isFreeArticle && <RadioButtonsSection
					shareType={ props.shareType }
					showGiftUrlSection={ props.actions.showGiftUrlSection }
					showNonGiftUrlSection={ props.actions.showNonGiftUrlSection }/>
				}

				<UrlSection {...props} />
			</div>
		</form>

		{ props.showCopyConfirmation &&
			<CopyConfirmation hideCopyConfirmation={ props.actions.hideCopyConfirmation }/> }

		{ props.showMobileShareLinks &&
			<MobileShareButtons mobileShareLinks={ props.mobileShareLinks }/> }
	</div>
);
