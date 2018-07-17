import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Title from './Title';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';

import styles from './GiftArticle.css';
const containerClassNames = [
	'o-forms',
	styles.container
].join(' ');

const urlTypeGift = 'gift-link';
const urlTypeNonGift = 'non-gift-link';
const trackingGift = 'giftLink';
const trackingNonGift = 'nonGiftLink';

let isGiftUrlCreated = false;

const withRadioButtonActions = withActions(({ url, urlType, giftUrl, nonGiftUrl, isGiftUrlCreated, mailtoGiftUrl, mailtoNonGiftUrl }) => ({
	displayGiftUrlSection() {
		return {
			isGift: true,
			url: isGiftUrlCreated ? giftUrl : url,
			urlType: isGiftUrlCreated ? urlTypeGift : urlType,
			mailtoUrl: mailtoGiftUrl,
			tracking: trackingGift
		}
	},
	displayNonGiftUrlSection() {
		return {
			isGift: false,
			url: nonGiftUrl,
			urlType: urlTypeNonGift,
			mailtoUrl: mailtoNonGiftUrl,
			tracking: trackingNonGift
		}
	},
	createGiftUrl() {
		isGiftUrlCreated = true;
		return {
			isGiftUrlCreated,
			url: giftUrl,
			urlType: urlTypeGift,
			mailtoUrl: mailtoGiftUrl
		}
	}
}));

const BaseTemplate = (data) => (
	<form name="gift-form">
		<fieldset className={ containerClassNames }>
			<Title title={ data.title }/>
			<RadioButtonsSection
				displayGiftUrlSection={ data.actions.displayGiftUrlSection }
				displayNonGiftUrlSection={ data.actions.displayNonGiftUrlSection }/>
			<UrlSection
				tracking={ data.tracking }
				isGift={ data.isGift }
				isGiftUrlCreated={ data.isGiftUrlCreated }
				url={ data.url }
				urlType={ data.urlType }
				credit={ data.credit }
				mailtoUrl={ data.mailtoUrl }
				createGiftUrl={ data.actions.createGiftUrl }/>
		</fieldset>
	</form>
);

const GiftArticle = withRadioButtonActions(BaseTemplate);

export { GiftArticle };
