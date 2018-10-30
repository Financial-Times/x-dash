import { createMailtoUrl } from './share-link-actions';
import { SHARE_TYPE_GIFT, SHARE_TYPE_NON_GIFT } from './constants';

const isCopySupported = typeof document !== 'undefined'
	&& document.queryCommandSupported
	&& document.queryCommandSupported('copy');
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class GiftArticlePropsComposer {
	constructor(props) {
		this.id = props.id;
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
		this.showNativeShareButton = props.nativeShare;

		this.isGiftUrlCreated = false;
		this.isGiftUrlShortened = false;
		this.isNonGiftUrlShortened = false;

		this.urls = {
			dummy: 'https://on.ft.com/gift_link',
			gift: undefined,
			nonGift: `${this.articleUrl}?shareType=nongift`
		};

		this.urlTypes = {
			dummy: 'example-gift-link',
			gift: 'gift-link',
			nonGift: 'non-gift-link'
		};

		this.mailtoUrls = {
			gift: undefined,
			nonGift: createMailtoUrl(this.articleTitle, `${this.articleUrl}?shareType=nongift`)
		};

		this.mobileShareLinks = this.showMobileShareLinks ? {
			facebook: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(this.articleUrl)}&amp;t=${encodeURIComponent(this.articleTitle)}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.articleUrl)}&amp;text=${encodeURIComponent(this.articleTitle)}&amp;via=financialtimes`,
			linkedin: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(this.articleUrl)}&amp;title=${encodeURIComponent(this.articleTitle)}&amp;source=Financial+Times`,
			whatsapp: `whatsapp://send?text=${encodeURIComponent(this.articleTitle)}%20-%20${encodeURIComponent(this.articleUrl)}`
		} : undefined;
	}

	getDefault() {
		const fundamentalProps = {
			id: this.id,
			title: this.title,
			isFreeArticle: this.isFreeArticle,
			isGiftUrlCreated: this.isGiftUrlCreated,
			articleId: this.articleId,
			articleUrl: this.articleUrl,
			sessionId: this.sessionId,
			showCopyButton: this.showCopyButton,
			showShareButtons: this.showMobileShareLinks,
			showNativeShareButton: this.showNativeShareButton,
			mobileShareLinks: this.mobileShareLinks
		};
		const additionalProps = this.isFreeArticle ? this.showNonGiftUrlSection() : this.showGiftUrlSection();

		return {
			...fundamentalProps,
			...additionalProps
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

	setAllowance(giftCredits, monthlyAllowance, nextRenewalDate) {
		const date = new Date(nextRenewalDate);
		this.nextRenewalDateText = `${ monthNames[date.getMonth()] } ${ date.getDate() }`;
		this.giftCredits = giftCredits;
		this.monthlyAllowance = monthlyAllowance;

		return {
			giftCredits: this.giftCredits,
			monthlyAllowance: this.monthlyAllowance,
			nextRenewalDateText: this.nextRenewalDateText
		};
	}

	setShortenedNonGiftUrl(shortenedUrl) {
		this.isNonGiftUrlShortened = true;
		this.mailtoUrls.nonGift = createMailtoUrl(this.articleTitle, shortenedUrl);
		this.urls.nonGift = shortenedUrl;

		return {
			url: this.urls.nonGift,
			mailtoUrl: this.mailtoUrls.nonGift
		};
	}

	showCopyConfirmation() {
		return { showCopyConfirmation: true };
	}

	hideCopyConfirmation() {
		return { showCopyConfirmation: false };
	}
}
