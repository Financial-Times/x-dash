import { h } from '@financial-times/x-engine';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';
import MobileShareButtons from './MobileShareButtons';
import CopyConfirmation from './CopyConfirmation';
import styles from './GiftArticle.css';

const formClassNames = [
	'o-forms',
	styles.form
].join(' ');

export default (props) => (
	<div className={ styles.container }>
		<form name="gift-form">
			<fieldset className={ formClassNames }>
				<Title title={ props.title }/>

				{ !props.isFreeArticle && <RadioButtonsSection
						shareType={ props.shareType }
						showGiftUrlSection={ props.actions.showGiftUrlSection }
						showNonGiftUrlSection={ props.actions.showNonGiftUrlSection }/>
				}

				<UrlSection {...props} />
			</fieldset>
		</form>

		{ props.showCopyConfirmation &&
			<CopyConfirmation hideCopyConfirmation={ props.actions.hideCopyConfirmation }/> }

		{ props.showShareButtons &&
			<MobileShareButtons mobileShareLinks={ props.mobileShareLinks }/> }
	</div>
);
