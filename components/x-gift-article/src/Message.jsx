import { h } from '@financial-times/x-engine';
import { ShareType } from './lib/constants';
import styles from './GiftArticle.css';

const messageClassName = styles.message;
const boldTextClassName = styles.bold;

export default ({ shareType, isGiftUrlCreated, isFreeArticle, giftCredits, monthlyAllowance, nextRenewalDateText, redemptionLimit }) => {

	if (isFreeArticle) {
		return (
			<div className={ messageClassName }>
				This article is currently <span className={ boldTextClassName }>free</span> for anyone to read
			</div>
		);
	}

	if (shareType === ShareType.gift) {
		if (giftCredits === 0) {
			return (
				<div className={ messageClassName }>
					You’ve used all your <span className={ boldTextClassName }>gift article credits</span><br />
					You’ll get your next { monthlyAllowance } on <span className={ boldTextClassName }>{ nextRenewalDateText }</span>
				</div>
			);
		}

		if (isGiftUrlCreated) {
			return (
				<div className={ messageClassName }>
					This link can be opened up to { redemptionLimit } times
				</div>
			);
		}

		return (
			<div className={ messageClassName }>
				You have <span className={ boldTextClassName }>{ giftCredits } gift article { giftCredits === 1 ? 'credit' : 'credits' }</span> left this month
			</div>
		);
	}

	if (shareType === ShareType.nonGift) {
		return (
			<div className={ messageClassName }>
			This link can only be read by existing subscribers
			</div>
		);
	}

};
