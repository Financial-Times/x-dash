import { createMailtoUrl } from './share-link-actions';
import { ShareType, UrlType } from './constants';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const showGiftUrlSection = (props) => ({
	shareType: ShareType.gift,
	url: props.urls.gift || props.urls.dummy,
	urlType: props.urls.gift ? UrlType.gift : UrlType.dummy,
	mailtoUrl: props.mailtoUrls.gift,
	showCopyConfirmation: false
});

export const showNonGiftUrlSection = (props) => ({
	shareType: ShareType.nonGift,
	url: props.urls.nonGift,
	urlType: UrlType.nonGift,
	mailtoUrl: props.mailtoUrls.nonGift,
	showCopyConfirmation: false
});

export const setGiftUrl = (url, redemptionLimit, isShortened) => props => {
	const mailtoUrl = createMailtoUrl(props.articleTitle, url);

	return {
		url,
		mailtoUrl,
		redemptionLimit,
		isGiftUrlCreated: true,
		isGiftUrlShortened: isShortened,
		urlType: UrlType.gift,

		urls: Object.assign(props.urls, {
			gift: url,
		}),

		mailtoUrls: Object.assign(props.mailtoUrls, {
			gift: mailtoUrl,
		})
	};
};

export const setAllowance = (giftCredits, monthlyAllowance, nextRenewalDate) => {
	const date = new Date(nextRenewalDate);
	const nextRenewalDateText = `${ monthNames[date.getMonth()] } ${ date.getDate() }`;

	return {
		giftCredits,
		monthlyAllowance,
		nextRenewalDateText
	};
};

export const setShortenedNonGiftUrl = (shortenedUrl) => props => {
	const mailtoUrl = createMailtoUrl(props.articleTitle, shortenedUrl);

	return {
		url: shortenedUrl,
		mailtoUrl: mailtoUrl,
		isNonGiftUrlShortened: true,

		urls: Object.assign(props.urls, {
			gift: shortenedUrl,
		}),

		mailtoUrls: Object.assign(props.mailtoUrls, {
			gift: mailtoUrl,
		})
	};
};
