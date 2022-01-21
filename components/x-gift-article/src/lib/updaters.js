import { createMailtoUrl } from './share-link-actions'
import { ShareType, UrlType } from './constants'

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

export const showGiftUrlSection = (props) => ({
	shareType: ShareType.gift,
	url: props.urls.gift || props.urls.dummy,
	urlType: props.urls.gift ? UrlType.gift : UrlType.dummy,
	mailtoUrl: props.mailtoUrls.gift,
	isGiftUrlCreated: !!props.urls.gift,
	showCopyConfirmation: false,
	invalidResponseFromApi: false
})

export const showGiftEnterpriseSection = (props) => ({
	shareType: ShareType.enterprise,
	url: props.urls.enterprise || props.urls.dummy,
	urlType: props.urls.enterprise ? UrlType.gift : UrlType.dummy,
	mailtoUrl: props.mailtoUrls.enterprise,
	isGiftUrlCreated: !!props.urls.enterprise,
	showCopyConfirmation: false,
	invalidResponseFromApi: false
})

export const showNonGiftUrlSection = (props) => ({
	shareType: ShareType.nonGift,
	url: props.urls.nonGift,
	urlType: UrlType.nonGift,
	mailtoUrl: props.mailtoUrls.nonGift,
	isGiftUrlCreated: false,
	showCopyConfirmation: false,
	invalidResponseFromApi: false
})

export const setGiftUrl =
	(url, redemptionLimit, isShortened, isEnterprise = false) =>
	(props) => {
		const mailtoUrl = createMailtoUrl(props.article.title, url)

		return {
			url,
			mailtoUrl,
			redemptionLimit: isEnterprise ? props.redemptionLimit : redemptionLimit, //note: when creating an enterprise link we do not change the redemption limit (this value is only used in the gift message)
			isGiftUrlCreated: true,
			isGiftUrlShortened: isShortened,
			urlType: isEnterprise ? UrlType.enterprise : UrlType.gift,

			urls: Object.assign(props.urls, {
				[isEnterprise ? 'enterprise' : 'gift']: url
			}),

			mailtoUrls: Object.assign(props.mailtoUrls, {
				[isEnterprise ? 'enterprise' : 'gift']: mailtoUrl
			}),
			invalidResponseFromApi: false
		}
	}

export const setAllowance = (giftCredits, monthlyAllowance, nextRenewalDate) => {
	const date = new Date(nextRenewalDate)
	const nextRenewalDateText = `${monthNames[date.getMonth()]} ${date.getDate()}`

	return {
		giftCredits,
		monthlyAllowance,
		nextRenewalDateText,
		invalidResponseFromApi: false
	}
}

export const setShortenedNonGiftUrl = (shortenedUrl) => (props) => {
	const mailtoUrl = createMailtoUrl(props.article.title, shortenedUrl)

	return {
		url: shortenedUrl,
		mailtoUrl: mailtoUrl,
		isNonGiftUrlShortened: true,

		urls: Object.assign(props.urls, {
			nonGift: shortenedUrl
		}),

		mailtoUrls: Object.assign(props.mailtoUrls, {
			nonGift: mailtoUrl
		})
	}
}

export const setErrorState = (errorState) => ({
	invalidResponseFromApi: errorState
})
