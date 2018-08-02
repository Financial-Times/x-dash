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

	showNonGiftUrlSection() {
		if (propsComposer.isNonGiftUrlShortened) {
			return propsComposer.showNonGiftUrlSection();
		} else {
			return api.getShorterUrl(articleUrl)
				.then(({ url, isShortened }) => {
					if (isShortened) {
						propsComposer.setShortenedNonGiftUrl(url);
					}
					return propsComposer.showNonGiftUrlSection();
				})
		}
	},

	createGiftUrl() {
		return api.getGiftUrl(articleId, sessionId)
			.then(({ redemptionUrl, redemptionLimit }) => {
				return api.getShorterUrl(redemptionUrl)
					.then(({ url, isShortened }) => {
						tracking.createGiftLink(url, redemptionUrl);
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

	getShorterNonGiftUrl() {
		return api.getShorterUrl(articleUrl)
			.then(({ url, isShortened }) => {
				if (isShortened) {
					return propsComposer.setShortenedNonGiftUrl(url);
				}
			})
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
