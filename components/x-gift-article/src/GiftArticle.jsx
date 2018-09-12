import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Loading from './Loading';
import Form from './Form';

import api from './lib/api';
import { copyToClipboard } from './lib/share-link-actions';
import tracking from './lib/tracking';

const withGiftFormActions = withActions(({ articleId, articleUrl, sessionId, composer }) => ({
	showGiftUrlSection() {
		return composer.showGiftUrlSection();
	},

	async showNonGiftUrlSection() {
		if (composer.isNonGiftUrlShortened) {
			return composer.showNonGiftUrlSection();
		} else {
			const { url, isShortened } = await api.getShorterUrl(articleUrl);
			if (isShortened) {
				composer.setShortenedNonGiftUrl(url);
			}
			return composer.showNonGiftUrlSection();
		}
	},

	async createGiftUrl() {
		const { redemptionUrl, redemptionLimit } = await api.getGiftUrl(articleId, sessionId);

		if (redemptionUrl) {
			const { url, isShortened } = await api.getShorterUrl(redemptionUrl);
			tracking.createGiftLink(url, redemptionUrl);
			return composer.setGiftUrl(url, redemptionLimit, isShortened);
		} else {
			// TODO do something
		}
	},

	async getAllowance() {
		const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getGiftArticleAllowance();

		// avoid to use giftCredits >= 0 because it returns true when null and ""
		if (giftCredits > 0 || giftCredits === 0) {
			return composer.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate);
		} else {
			// TODO do something
		}
	},

	async getShorterNonGiftUrl() {
		const { url, isShortened } = await api.getShorterUrl(articleUrl);

		if (isShortened) {
			return composer.setShortenedNonGiftUrl(url);
		}
	},

	copyGiftUrl() {
		const giftUrl = composer.urls.gift;
		copyToClipboard(giftUrl);
		tracking.copyLink('giftLink', giftUrl);

		return composer.showCopyConfirmation();
	},

	copyNonGiftUrl() {
		const nonGiftUrl = composer.urls.nonGift;
		copyToClipboard(nonGiftUrl);
		tracking.copyLink('nonGiftLink', nonGiftUrl);

		return composer.showCopyConfirmation();
	},

	emailGiftUrl() {
		tracking.emailLink('giftLink', composer.urls.gift);
	},

	emailNonGiftUrl() {
		tracking.emailLink('nonGiftLink', composer.urls.nonGift);
	},

	hideCopyConfirmation() {
		return composer.hideCopyConfirmation();
	},

	shareByNativeShare() {
		// TODO display native share
	}
}));

const BaseTemplate = (props) => {
	document.body.addEventListener('xDash.giftArticle.activate', () => {
		props.isFreeArticle ?
			props.actions.getShorterNonGiftUrl() : props.actions.getAllowance();
	})

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
