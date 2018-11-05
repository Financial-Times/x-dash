import { h } from '@financial-times/x-engine';
import { SHARE_TYPE_GIFT, SHARE_TYPE_NON_GIFT } from './lib/constants';
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

	if (shareType === SHARE_TYPE_GIFT) {
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

	if (shareType === SHARE_TYPE_NON_GIFT) {
		return (
			<div className={ messageClassName }>
			This link can only be read by existing subscribers
			</div>
		);
	}

};
