import { h } from '@financial-times/x-engine';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';
import MobileShareButtons from './MobileShareButtons';
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
				credit={ props.credit }
				monthlyAllowance={ props.monthlyAllowance }
				dateText={ props.dateText }
				mailtoLink={ props.mailtoLink }
				createGiftUrl={ props.actions.createGiftUrl }
				redemptionLimit={ props.redemptionLimit }/>

		</fieldset>

		{ props.showShareButtons ?
				<MobileShareButtons mobileShareLinks={ props.mobileShareLinks }/> : null
		}

	</form>
);
