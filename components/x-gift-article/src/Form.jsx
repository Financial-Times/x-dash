import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import RadioButtonsSection from './RadioButtonsSection';
import UrlSection from './UrlSection';
import Message from './Message';

let isGiftUrlCreated = false;

const withRadioButtonActions = withActions(({ url, giftUrl, nonGiftUrl, isGiftUrlCreated, mailtoGiftUrl, mailtoNonGiftUrl }) => ({
	displayGiftUrlSection() {
		return {
			isGift: true,
			url: isGiftUrlCreated ? giftUrl : url,
			mailtoUrl: mailtoGiftUrl
		}
	},
	displayNonGiftUrlSection() {
		return {
			isGift: false,
			url: nonGiftUrl,
			mailtoUrl: mailtoNonGiftUrl
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
	<div className="gift-form__form">
		<RadioButtonsSection
			displayGiftUrlSection={ data.actions.displayGiftUrlSection }
			displayNonGiftUrlSection={ data.actions.displayNonGiftUrlSection }/>
		<UrlSection
			isGift={ data.isGift }
			isGiftUrlCreated={ data.isGiftUrlCreated }
			mailtoUrl={ data.mailtoUrl }
			createGiftUrl={ data.actions.createGiftUrl }
			credit={ data.credit }
			url={ data.url }/>
		<Message
			isGift={ data.isGift }
			isGiftUrlCreated={ data.isGiftUrlCreated }
			credit={ data.credit }/>
	</div>
);

const Form = withRadioButtonActions(BaseTemplate);

export { Form };
