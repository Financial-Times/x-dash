import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const messageClassName = styles.message;
const boldTextClassName = styles.bold;

export default ({ isGift, isGiftUrlCreated, isFreeArticle, credit }) => {

	if (isFreeArticle) {
		return (<div className={ messageClassName }>This article is currently <span className={ boldTextClassName }>free</span> for anyone to read</div>);
	}

	if (isGift) {
		if (isGiftUrlCreated) {
			return (<div className={ messageClassName }>This link can be opened up to 3 times</div>);
		}
		return (<div className={ messageClassName }>You have <span className={ boldTextClassName }>{ credit } gift articles</span> left this month</div>);
	}

	return (<div className={ messageClassName }>This link can only be read by existing subscribers</div>);

};
