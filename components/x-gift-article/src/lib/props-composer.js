import createMailtoLink from './create-mailto-link';

export class GiftArticlePropsComposer {
	constructor({isFreeArticle, articleTitle, articleUrl}) {
		this.isFreeArticle = isFreeArticle;
		this.articleTitle = articleTitle;
		this.articleUrl = articleUrl;
		this.isGiftUrlCreated = false;

		this.urls = {
			dummy: 'https://dummy-url',
			gift: undefined,
			nonGift: 'https://non-gift-url'
		};

		this.urlTypes = {
			dummy: 'example-gift-link',
			gift: 'gift-link',
			nonGift: 'non-gift-link'
		}

		this.mailtoLinks = {
			gift: undefined,
			nonGift: createMailtoLink(this.articleTitle, this.articleUrl)
		}

		this.types = {
			gift: 'giftLink',
			nonGift: 'nonGiftLink'
		}
	}

	getDefault() {
		return  {
			title: 'Share this article',
			isGift: this.isFreeArticle ? false : true,
			url: this.isFreeArticle ? this.urls.nonGift : this.urls.dummy,
			urlType: this.isFreeArticle ? this.urlTypes.nonGift : this.urlTypes.dummy,
			mailtoLink: this.isFreeArticle ? this.mailtoLinks.nonGift : undefined,
			isGiftUrlCreated: this.isGiftUrlCreated,
			type: this.isFreeArticle ? this.types.nonGift : this.types.gift
		};
	}

	displayGiftUrlSection() {
		return {
			isGift: true,
			url: this.urls.gift || this.urls.dummy,
			urlType: this.urls.gift ? this.urlTypes.gift : this.urlTypes.dummy,
			mailtoLink: this.mailtoLinks.gift,
			type: this.types.gift
		}
	}

	displayNonGiftUrlSection() {
		return {
			isGift: false,
			url: this.urls.nonGift,
			urlType: this.urlTypes.nonGift,
			mailtoLink: this.mailtoLinks.nonGift,
			type: this.types.nonGift
		}
	}

	createGiftUrl(url) {
		this.urls.gift = url;
		this.isGiftUrlCreated = true;
		this.mailtoLinks.gift = createMailtoLink(this.articleTitle, url);

		return {
			isGiftUrlCreated: this.isGiftUrlCreated,
			url: this.urls.gift,
			urlType: this.urlTypes.gift,
			mailtoLink: this.mailtoLinks.gift
		}
	}
}
