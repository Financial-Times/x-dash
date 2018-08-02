import { createMailtoUrl } from './share-link-actions';
import getNextAllowanceDate from './get-next-allowance-date';
import { SHARE_TYPE_GIFT, SHARE_TYPE_NON_GIFT } from './constants';

export class GiftArticlePropsComposer {
	constructor(props, isCopySupported) {
		this.isFreeArticle = props.isFreeArticle;
		this.articleTitle = props.articleTitle;
		this.articleUrl = props.articleUrl;
		this.articleId = props.articleId;

		this.title = props.title || 'Share this article';
		this.sessionId = props.sessionId;
		this.giftCredits = undefined;
		this.monthlyAllowance = undefined;

		this.showCopyButton = isCopySupported;
		this.showMobileShareLinks = props.showMobileShareLinks;

		this.isGiftUrlCreated = false;
		this.isGiftUrlShortened = false;
		this.isNonGiftUrlShortened = false;

		this.urls = {
			dummy: 'https://on.ft.com/gift_link',
			gift: undefined,
			nonGift: this.articleUrl
		};

		this.urlTypes = {
			dummy: 'example-gift-link',
			gift: 'gift-link',
			nonGift: 'non-gift-link'
		};

		this.mailtoUrls = {
			gift: undefined,
			nonGift: createMailtoUrl(this.articleTitle, this.articleUrl)
		};

		this.mobileShareLinks = this.showMobileShareLinks ? {
			facebook: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.articleUrl)}&amp;t=${encodeURIComponent(this.articleTitle)}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.articleUrl)}&amp;text=${encodeURIComponent(this.articleTitle)}&amp;via=financialtimes`,
			linkedin: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(this.articleUrl)}&amp;title=${encodeURIComponent(this.articleTitle)}&amp;source=Financial+Times`,
			whatsapp: `whatsapp://send?text=${encodeURIComponent(this.articleTitle)}%20-%20${encodeURIComponent(this.articleUrl)}`
		} : undefined;
	}

	getDefault() {
		return  {
			title: this.title,
			isFreeArticle: this.isFreeArticle,
			shareType: this.isFreeArticle ? SHARE_TYPE_NON_GIFT : SHARE_TYPE_GIFT,
			url: this.isFreeArticle ? this.urls.nonGift : this.urls.dummy,
			urlType: this.isFreeArticle ? this.urlTypes.nonGift : this.urlTypes.dummy,
			mailtoUrl: this.isFreeArticle ? this.mailtoUrls.nonGift : undefined,
			isGiftUrlCreated: this.isGiftUrlCreated,
			articleId: this.articleId,
			articleUrl: this.articleUrl,
			sessionId: this.sessionId,
			showCopyButton: this.showCopyButton,
			showCopyConfirmation: false,
			showShareButtons: this.showMobileShareLinks,
			mobileShareLinks: this.mobileShareLinks
		};
	}

	showGiftUrlSection() {
		return {
			shareType: SHARE_TYPE_GIFT,
			url: this.urls.gift || this.urls.dummy,
			urlType: this.urls.gift ? this.urlTypes.gift : this.urlTypes.dummy,
			mailtoUrl: this.mailtoUrls.gift,
			showCopyConfirmation: false
		};
	}

	showNonGiftUrlSection() {
		return {
			shareType: SHARE_TYPE_NON_GIFT,
			url: this.urls.nonGift,
			urlType: this.urlTypes.nonGift,
			mailtoUrl: this.mailtoUrls.nonGift,
			showCopyConfirmation: false
		};
	}

	setGiftUrl(url, limit, isShortened) {
		this.urls.gift = url;
		this.isGiftUrlCreated = true;
		this.isGiftUrlShortened = isShortened;
		this.mailtoUrls.gift = createMailtoUrl(this.articleTitle, url);

		return {
			isGiftUrlCreated: this.isGiftUrlCreated,
			url: this.urls.gift,
			urlType: this.urlTypes.gift,
			mailtoUrl: this.mailtoUrls.gift,
			redemptionLimit: limit
		};
	}

	setAllowance(giftCredits, monthlyAllowance) {
		let dateText = undefined;
		this.giftCredits = giftCredits;
		this.monthlyAllowance = monthlyAllowance;
		if (giftCredits === 0) {
			const nextAllowanceDate = getNextAllowanceDate();
			dateText = `${nextAllowanceDate.monthName} ${nextAllowanceDate.day}`;
		}

		return {
			giftCredits: this.giftCredits,
			monthlyAllowance: this.monthlyAllowance,
			dateText
		};
	}

	setShortenedNonGiftUrl(shortenedUrl) {
		this.isNonGiftUrlShortened = true;
		this.mailtoUrls.nonGift = createMailtoUrl(this.articleTitle, shortenedUrl);
		this.urls.nonGift = shortenedUrl;
	}

	showCopyConfirmation() {
		return { showCopyConfirmation: true };
	}

	hideCopyConfirmation() {
		return { showCopyConfirmation: false };
	}
}
