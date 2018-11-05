import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';

import Loading from './Loading';
import Form from './Form';

import ApiClient from './lib/api';
import { copyToClipboard, createMailtoUrl } from './lib/share-link-actions';
import tracking from './lib/tracking';
import * as updaters from './lib/updaters';

const isCopySupported = typeof document !== 'undefined'
	&& document.queryCommandSupported
	&& document.queryCommandSupported('copy');

const withGiftFormActions = withActions(
	props => {
		const api = new ApiClient({
			protocol: props.apiProtocol,
			domain: props.apiDomain
		});

		return {
			showGiftUrlSection() {
				return updaters.showGiftUrlSection();
			},

			async showNonGiftUrlSection() {
				if (!updaters.isNonGiftUrlShortened) {
					const { url, isShortened } = await api.getShorterUrl(updaters.urls.nonGift);
						if (isShortened) {
							updaters.setShortenedNonGiftUrl(url);
						}
				}

				return updaters.showNonGiftUrlSection();
			},

			async createGiftUrl() {
				const { redemptionUrl, redemptionLimit } = await api.getGiftUrl(articleId);

				if (redemptionUrl) {
					const { url, isShortened } = await api.getShorterUrl(redemptionUrl);
					tracking.createGiftLink(url, redemptionUrl);
					return updaters.setGiftUrl(url, redemptionLimit, isShortened);
				} else {
					// TODO do something
				}
			},

			copyGiftUrl(event) {
				const giftUrl = updaters.urls.gift;
				copyToClipboard(event);
				tracking.copyLink('giftLink', giftUrl);

				return { showCopyConfirmation: true };
			},

			copyNonGiftUrl(event) {
				const nonGiftUrl = updaters.urls.nonGift;
				copyToClipboard(event);
				tracking.copyLink('nonGiftLink', nonGiftUrl);

				return { showCopyConfirmation: true };
			},

			emailGiftUrl() {
				tracking.emailLink('giftLink', updaters.urls.gift);
			},

			emailNonGiftUrl() {
				tracking.emailLink('nonGiftLink', updaters.urls.nonGift);
			},

			hideCopyConfirmation() {
				return { showCopyConfirmation: false };
			},

			shareByNativeShare() {
				throw new Error(`shareByNativeShare should be implemented by x-gift-article's consumers`);
			},

			async activate() {
				if (isFreeArticle) {
					const { url, isShortened } = await api.getShorterUrl(updaters.urls.nonGift);

					if (isShortened) {
						return updaters.setShortenedNonGiftUrl(url);
					}
				} else {
					const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getGiftArticleAllowance();

					// avoid to use giftCredits >= 0 because it returns true when null and ""
					if (giftCredits > 0 || giftCredits === 0) {
						return updaters.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate);
					} else {
						// TODO do something
					}
				}
			}
		}
	},
	props => ({
		title: 'Share this article',
		giftCredits: undefined,
		monthlyAllowance: undefined,
		showCopyButton: isCopySupported,
		isGiftUrlCreated: false,
		isGiftUrlShortened: false,
		isNonGiftUrlShortened: false,

		urls: {
			dummy: 'https://on.ft.com/gift_link',
			gift: undefined,
			nonGift: `${props.articleUrl}?shareType=nongift`
		},

		mailtoUrls: {
			gift: undefined,
			nonGift: createMailtoUrl(props.articleTitle, `${props.articleUrl}?shareType=nongift`)
		},

		mobileShareLinks: props.showMobileShareLinks
			? {
				facebook: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(props.articleUrl)}&t=${encodeURIComponent(props.articleTitle)}`,
				twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(props.articleUrl)}&text=${encodeURIComponent(props.articleTitle)}&via=financialtimes`,
				linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(props.articleUrl)}&title=${encodeURIComponent(props.articleTitle)}&source=Financial+Times`,
				whatsapp: `whatsapp://send?text=${encodeURIComponent(props.articleTitle)}%20-%20${encodeURIComponent(props.articleUrl)}`
			}
			: undefined,

		...(props.isFreeArticle
			? updaters.showNonGiftUrlSection(props)
			: updaters.showGiftUrlSection(props)
		),
	})
);

const BaseGiftArticle = (props) => {
	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseGiftArticle);

export { GiftArticle };
