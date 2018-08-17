import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Loading from './Loading';
import Form from './Form';

import api from './lib/api';
import { copyToClipboard } from './lib/share-link-actions';
import tracking from './lib/tracking';

let hasAttemptedToShortenedNonGiftUrl = false;
let hasAttemptedToGetAllowance = false;
let propsComposer;

const withGiftFormActions = withActions(({ articleId, articleUrl, sessionId }) => ({
	showGiftUrlSection() {
		return propsComposer.showGiftUrlSection();
	},

	async showNonGiftUrlSection() {
		if (propsComposer.isNonGiftUrlShortened) {
			return propsComposer.showNonGiftUrlSection();
		} else {
			const { url, isShortened } = await api.getShorterUrl(articleUrl);
			if (isShortened) {
				propsComposer.setShortenedNonGiftUrl(url);
			}
			return propsComposer.showNonGiftUrlSection();
		}
	},

	async createGiftUrl() {
		const { redemptionUrl, redemptionLimit } = await api.getGiftUrl(articleId, sessionId);

		if (redemptionUrl) {
			const { url, isShortened } = await api.getShorterUrl(redemptionUrl);
			tracking.createGiftLink(url, redemptionUrl);
			return propsComposer.setGiftUrl(url, redemptionLimit, isShortened);
		} else {
			// TODO do something
		}
	},

	async getAllowance() {
		const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getGiftArticleAllowance();

		// avoid to use giftCredits >= 0 because it returns true when null and ""
		if (giftCredits > 0 || giftCredits === 0) {
			return propsComposer.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate);
		} else {
			// TODO do something
		}
	},

	async getShorterNonGiftUrl() {
		const { url, isShortened } = await api.getShorterUrl(articleUrl);

		if (isShortened) {
			return propsComposer.setShortenedNonGiftUrl(url);
		}
	},

	copyGiftUrl() {
		const giftUrl = propsComposer.urls.gift;
		copyToClipboard(giftUrl);
		tracking.copyLink('giftLink', giftUrl);

		return propsComposer.showCopyConfirmation();
	},

	copyNonGiftUrl() {
		const nonGiftUrl = propsComposer.urls.nonGift;
		copyToClipboard(nonGiftUrl);
		tracking.copyLink('nonGiftLink', nonGiftUrl);

		return propsComposer.showCopyConfirmation();
	},

	emailGiftUrl() {
		tracking.emailLink('giftLink', propsComposer.urls.gift);
	},

	emailNonGiftUrl() {
		tracking.emailLink('nonGiftLink', propsComposer.urls.nonGift);
	},

	hideCopyConfirmation() {
		return propsComposer.hideCopyConfirmation();
	},

	shareByNativeShare() {
		// TODO display native share
	}

}));

const BaseTemplate = (props) => {
	if (!propsComposer) {
		propsComposer = props.composer;
	}

	if (props.isFreeArticle && !hasAttemptedToShortenedNonGiftUrl) {
		hasAttemptedToShortenedNonGiftUrl = true;
		props.actions.getShorterNonGiftUrl();
	}

	if (!props.isFreeArticle && !hasAttemptedToGetAllowance) {
		hasAttemptedToGetAllowance = true;
		props.actions.getAllowance();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
