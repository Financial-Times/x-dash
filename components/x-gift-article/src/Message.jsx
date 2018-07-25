import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const messageClassName = styles.message;
const boldTextClassName = styles.bold;

export default ({ isGift, isGiftUrlCreated, isFreeArticle, credit, monthlyAllowance, dateText, redemptionLimit }) => {

	if (isFreeArticle) {
		return (<div className={ messageClassName }>This article is currently <span className={ boldTextClassName }>free</span> for anyone to read</div>);
	}

	if (isGift) {
		if (credit === 0) {
			return (
				<div className={ messageClassName }>You’ve used all your <span className={ boldTextClassName }>gift articles</span><br />
					You’ll get your next { monthlyAllowance } on <span className={ boldTextClassName }>{ dateText }</span><
				/div>
			);
		}

		if (isGiftUrlCreated) {
			return (<div className={ messageClassName }>This link can be opened up to { redemptionLimit } times</div>);
		}

		return (
			<div className={ messageClassName }>
				You have <span className={ boldTextClassName }>{ credit } gift { credit === 1 ? 'article' : 'articles' }</span> left this month
			</div>);
	}

	return (<div className={ messageClassName }>This link can only be read by existing subscribers</div>);

};
