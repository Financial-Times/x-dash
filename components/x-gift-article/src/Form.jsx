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
	<form name="gift-form" className={ styles.container }>
		<fieldset className={ formClassNames }>

			<Title title={ props.title }/>

			{ props.isFreeArticle ? null : <RadioButtonsSection
					isGift={ props.isGift }
					displayGiftUrlSection={ props.actions.displayGiftUrlSection }
					displayNonGiftUrlSection={ props.actions.displayNonGiftUrlSection }/>
			}

			<UrlSection
				type={ props.type }
				isGift={ props.isGift }
				isGiftUrlCreated={ props.isGiftUrlCreated }
				isFreeArticle={ props.isFreeArticle }
				url={ props.url }
				urlType={ props.urlType }
				giftCredits={ props.giftCredits }
				monthlyAllowance={ props.monthlyAllowance }
				dateText={ props.dateText }
				mailtoUrl={ props.mailtoUrl }
				createGiftUrl={ props.actions.createGiftUrl }
				copyGiftUrl={ props.actions.copyGiftUrl }
				copyNonGiftUrl={ props.actions.copyNonGiftUrl }
				redemptionLimit={ props.redemptionLimit }
				showCopyButton={ props.showCopyButton }/>

		</fieldset>

		{ props.showCopyConfirmation ? <CopyConfirmation hideCopyConfirmation={ props.actions.hideCopyConfirmation }/> : null }

		{ props.showShareButtons ?
				<MobileShareButtons mobileShareLinks={ props.mobileShareLinks }/> : null
		}

	</form>
);
