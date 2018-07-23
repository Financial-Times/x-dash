import { h } from '@financial-times/x-engine';
import { withActions } from '@financial-times/x-interaction';
import Loading from './Loading';
import Form from './Form';

import getGiftUrl from './lib/get-gift-url';
import createMailtoLink from './lib/create-mailto-link';
import fetchGiftCredit from './lib/fetch-gift-credit';

const urlTypeGift = 'gift-link';
const urlTypeNonGift = 'non-gift-link';
const urlTypeDefault = 'example-gift-link';

const typeGift = 'giftLink';
const typeNonGift = 'nonGiftLink';

const defaultUrl = 'https://dummy-url';
const nonGiftUrl = 'https://non-gift-url';

let giftUrl = undefined;
let mailtoGiftUrl;
let mailtoNonGiftUrl;
let hasAttempetedToFetchCredit = false;

const withGiftFormActions = withActions(({ isFreeArticle, title, articleTitle, articleUrl }) => ({
	displayGiftUrlSection() {
		return {
			isGift: true,
			url: giftUrl || defaultUrl,
			urlType: giftUrl ? urlTypeGift : urlTypeDefault,
			mailtoUrl: mailtoGiftUrl,
			type: typeGift
		}
	},
	displayNonGiftUrlSection() {
		return {
			isGift: false,
			url: nonGiftUrl,
			urlType: urlTypeNonGift,
			mailtoUrl: mailtoNonGiftUrl,
			type: typeNonGift
		}
	},
	createGiftUrl() {
		return getGiftUrl()
			.then(url => {
				giftUrl = url;
				mailtoGiftUrl = createMailtoLink(articleTitle, giftUrl);

				return {
					isGiftUrlCreated: true,
					url: giftUrl,
					urlType: urlTypeGift,
					mailtoUrl: mailtoGiftUrl
				}
			})
	},
	composeData() {
		mailtoNonGiftUrl = createMailtoLink(articleTitle, articleUrl);

		const composedData = {
			title: title || 'Share this article',
			isGift: isFreeArticle ? false : true,
			url: isFreeArticle ? nonGiftUrl : defaultUrl,
			urlType: isFreeArticle ? urlTypeNonGift : urlTypeDefault,
			mailtoUrl: isFreeArticle ? mailtoNonGiftUrl : undefined,
			isGiftUrlCreated: false,
			type: isFreeArticle ? typeNonGift : typeGift
		};

		return fetchGiftCredit()
			.then(credit => {
				composedData.credit = credit
				return composedData;
			})
			.catch(() => {
				return composedData;
			})
	}
}));

const BaseTemplate = (props) => {
	if (!hasAttempetedToFetchCredit) {
		hasAttempetedToFetchCredit = true;
		props.actions.composeData();
	}

	return props.isLoading ? <Loading/> : <Form {...props}/>;
};

const GiftArticle = withGiftFormActions(BaseTemplate);

export { GiftArticle };
