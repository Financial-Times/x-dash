import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';
import styles from './GiftArticle.css';

let isGiftUrlCreated = false;

const withRadioButtonActions = withActions(({ url, giftUrl, nonGiftUrl, isGiftUrlCreated, mailtoGiftUrl, mailtoNonGiftUrl }) => ({
	displayGiftUrlSection() {
		return {
			isGift: true,
			url: isGiftUrlCreated ? giftUrl : url,
			mailtoUrl: mailtoGiftUrl,
			tracking: 'giftLink'
		}
	},
	displayNonGiftUrlSection() {
		return {
			isGift: false,
			url: nonGiftUrl,
			mailtoUrl: mailtoNonGiftUrl,
			tracking: 'nonGiftLink'
		}
	},
	createGiftUrl() {
		isGiftUrlCreated = true;
		return {
			isGiftUrlCreated: true,
			url: giftUrl,
			mailtoUrl: mailtoGiftUrl
		}
	}
}));

const BaseTemplate = (data) => (
	<form name="gift-form" className={ styles.container }>
		<fieldset className="o-forms">
			<Title title={ data.title }/>
			<RadioButtonsSection
				displayGiftUrlSection={ data.actions.displayGiftUrlSection }
				displayNonGiftUrlSection={ data.actions.displayNonGiftUrlSection }/>
			<UrlSection
				tracking={ data.tracking }
				isGift={ data.isGift }
				isGiftUrlCreated={ data.isGiftUrlCreated }
				url={ data.url }
				credit={ data.credit }
				mailtoUrl={ data.mailtoUrl }
				createGiftUrl={ data.actions.createGiftUrl }/>
		</fieldset>
	</form>
);

const GiftArticle = withRadioButtonActions(BaseTemplate);

export { GiftArticle };
