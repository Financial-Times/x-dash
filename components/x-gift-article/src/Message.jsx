import { h } from '@financial-times/x-engine';

export default ({ isGift, isGiftUrlCreated, credit }) => {

	const messageSubscriber = 'This link can only be read by existing subscribers';
	const messageCopyLimit = 'This link can be opened up to 3 times';
	const messageGiftCreditRemaining = [ 'You have ', <strong>{ credit } gift articles</strong>, ' left this month' ];

	let message = messageSubscriber;

	if (isGift) {
		message = isGiftUrlCreated ? messageCopyLimit : messageGiftCreditRemaining;
	}

	return (<div className="gift-form__message">{ message }</div>);

};
