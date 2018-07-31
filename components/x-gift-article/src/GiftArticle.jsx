import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import api from './lib/api';
import { copyToClipboard } from './lib/share-link-actions';

let hasAttemptedToGetAllowance = false;
let propsComposer;

const withGiftFormActions = withActions(({ articleId, articleUrl, sessionId }) => ({
	displayGiftUrlSection() {
		return propsComposer.displayGiftUrlSection();
	},

	displayNonGiftUrlSection() {
		if (propsComposer.isNonGiftUrlShortened) {
			return propsComposer.displayNonGiftUrlSection();
		} else {
			return api.getShorterUrl(articleUrl)
				.then(({ url, isShortened }) => {
					if (isShortened) {
						propsComposer.setShortenedNonGiftUrl(url);
					}
					return propsComposer.displayNonGiftUrlSection();
				})
		}
	},

	createGiftUrl() {
		return api.getGiftUrl(articleId, sessionId)
			.then(({ redemptionUrl, redemptionLimit }) => {
				return api.getShorterUrl(redemptionUrl)
					.then(({ url, isShortened }) => {
						return propsComposer.setGiftUrl(url, redemptionLimit, isShortened);
					})
			})
	},

	getAllowance() {
		return api.getGiftArticleAllowance()
			.then(({ giftCredits, monthlyAllowance }) => {
				return propsComposer.setAllowance(giftCredits, monthlyAllowance);
			})
			.catch(() => {
				// do something
			})
	},

	copyGiftUrl() {
		copyToClipboard(propsComposer.urls.gift);
		return propsComposer.showCopyConfirmation();
	},

	copyNonGiftUrl() {
		copyToClipboard(propsComposer.urls.nonGift);
		return propsComposer.showCopyConfirmation();
	},

	hideCopyConfirmation() {
		return propsComposer.hideCopyConfirmation();
	}

}));

const BaseTemplate = (props) => {
	if (!propsComposer) {
		propsComposer = props.composer;
	}

	if (!hasAttemptedToGetAllowance && !props.isFreeArticle) {
		hasAttemptedToGetAllowance = true;
		props.actions.getAllowance();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
