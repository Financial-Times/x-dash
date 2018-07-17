import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

export default ({ isGift, isGiftUrlCreated, credit }) => {

	const messageSubscriber = 'This link can only be read by existing subscribers';
	const messageCopyLimit = 'This link can be opened up to 3 times';
	const messageGiftCreditRemaining = [ 'You have ', <span className={ styles.bold }>{ credit } gift articles</span>, ' left this month' ];

	let message = messageSubscriber;

	if (isGift) {
		message = isGiftUrlCreated ? messageCopyLimit : messageGiftCreditRemaining;
	}

	return (<div className={ styles.message }>{ message }</div>);

};
