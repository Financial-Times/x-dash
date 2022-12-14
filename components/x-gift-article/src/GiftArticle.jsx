import { h } from '@financial-times/x-engine'
import { withActions } from '@financial-times/x-interaction'

import Loading from './Loading'
import Form from './Form'

import ApiClient from './lib/api'
import EnterpriseApiClient from './lib/enterpriseApi'
import { copyToClipboard, createMailtoUrl } from './lib/share-link-actions'
import tracking from './lib/tracking'
import * as updaters from './lib/updaters'
import { ShareType } from './lib/constants'

const isCopySupported =
	typeof document !== 'undefined' && document.queryCommandSupported && document.queryCommandSupported('copy')

const todayDate = new Date()
const monthNow = `${updaters.monthNames[todayDate.getMonth()]}`

const withGiftFormActions = withActions(
	(initialProps) => {
		const api = new ApiClient({
			protocol: initialProps.apiProtocol,
			domain: initialProps.apiDomain
		})
		const enterpriseApi = new EnterpriseApiClient(initialProps.enterpriseApiBaseUrl)

		return {
			showGiftUrlSection() {
				return updaters.showGiftUrlSection
			},

			showEnterpriseUrlSection() {
				return updaters.showGiftEnterpriseSection
			},

			showNonGiftUrlSection() {
				return async (state) => {
					const update = updaters.showNonGiftUrlSection(state)

					if (!state.isNonGiftUrlShortened) {
						const { url, isShortened } = await api.getShorterUrl(state.urls.nonGift)

						if (isShortened) {
							Object.assign(update, updaters.setShortenedNonGiftUrl(url)(state))
						}
					}

					return update
				}
			},

			async createGiftUrl() {
				const { redemptionUrl, redemptionLimit } = await api.getGiftUrl(initialProps.article.id)

				if (redemptionUrl) {
					const { url, isShortened } = await api.getShorterUrl(redemptionUrl)
					tracking.createGiftLink(url, redemptionUrl)

					return updaters.setGiftUrl(url, redemptionLimit, isShortened)
				} else {
					return updaters.setErrorState(true)
				}
			},

			async createEnterpriseUrl() {
				const { redemptionUrl, redemptionLimit } = await enterpriseApi.getESUrl(initialProps.article.id)

				if (redemptionUrl) {
					tracking.createESLink(redemptionUrl)
					return updaters.setGiftUrl(redemptionUrl, redemptionLimit, false, true)
				} else {
					return updaters.setErrorState(true)
				}
			},

			copyGiftUrl(event) {
				copyToClipboard(event)

				return (state) => {
					const giftUrl = state.urls.gift
					tracking.copyLink('giftLink', giftUrl)

					return { showCopyConfirmation: true }
				}
			},

			copyEnterpriseUrl(event) {
				copyToClipboard(event)

				return (state) => {
					const enterpriseUrl = state.urls.enterprise
					tracking.copyLink('enterpriseLink', enterpriseUrl)

					return { showCopyConfirmation: true }
				}
			},

			copyNonGiftUrl(event) {
				copyToClipboard(event)

				return (state) => {
					const nonGiftUrl = state.urls.nonGift
					tracking.copyLink('nonGiftLink', nonGiftUrl)

					return { showCopyConfirmation: true }
				}
			},

			emailGiftUrl() {
				return (state) => {
					tracking.emailLink('giftLink', state.urls.gift)
				}
			},

			emailEnterpriseUrl() {
				return (state) => {
					tracking.emailLink('enterpriseLink', state.urls.enterprise)
				}
			},

			emailNonGiftUrl() {
				return (state) => {
					tracking.emailLink('nonGiftLink', state.urls.nonGift)
				}
			},

			hideCopyConfirmation() {
				return { showCopyConfirmation: false }
			},

			copyRafUrl(event) {
				copyToClipboard(event)

				return (state) => {
					const rafUrl = state.urls.raf
					tracking.copyLink('rafLink', rafUrl)

					return { showRafCopyConfirmation: true }
				}
			},

			hideRafCopyConfirmation() {
				return { showRafCopyConfirmation: false }
			},

			shareByNativeShare() {
				throw new Error(`shareByNativeShare should be implemented by x-gift-article's consumers`)
			},

			activate() {
				return async (state) => {
					const { enabled, limit, hasCredits, firstTimeUser, requestAccess } =
						await enterpriseApi.getEnterpriseArticleAllowance()

					if (enabled) {
						tracking.initEnterpriseSharing(
							requestAccess
								? 'enterprise-request-access'
								: !hasCredits
								? 'enterprise-no-credits'
								: 'enterprise-enabled'
						)
					} else {
						tracking.initEnterpriseSharing('enterprise-disabled')
					}

					if (initialProps.isFreeArticle) {
						const { url, isShortened } = await api.getShorterUrl(state.urls.nonGift)

						if (isShortened) {
							updaters.setShortenedNonGiftUrl(url)(state)
						}
						return {
							invalidResponseFromApi: true,
							enterpriseEnabled: enabled,
							enterpriseLimit: limit,
							enterpriseHasCredits: hasCredits,
							enterpriseFirstTimeUser: firstTimeUser,
							enterpriseRequestAccess: requestAccess
						}
					} else {
						const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getGiftArticleAllowance()

						// avoid to use giftCredits >= 0 because it returns true when null and ""
						if (giftCredits > 0 || giftCredits === 0) {
							return {
								...updaters.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate),
								shareType: enabled && hasCredits ? ShareType.enterprise : ShareType.gift,
								enterpriseEnabled: enabled,
								enterpriseLimit: limit,
								enterpriseHasCredits: hasCredits,
								enterpriseFirstTimeUser: firstTimeUser,
								enterpriseRequestAccess: requestAccess
							}
						} else {
							return {
								invalidResponseFromApi: true,
								enterpriseEnabled: enabled,
								enterpriseLimit: limit,
								enterpriseHasCredits: hasCredits,
								enterpriseFirstTimeUser: firstTimeUser,
								enterpriseRequestAccess: requestAccess
							}
						}
					}
				}
			}
		}
	},
	(props) => {
		const initialState = {
			title: 'Share this article',
			giftCredits: undefined,
			monthlyAllowance: undefined,
			monthNow: monthNow,
			showCopyButton: isCopySupported,
			isGiftUrlCreated: false,
			isGiftUrlShortened: false,
			isNonGiftUrlShortened: false,
			isArticleSharingUxUpdates: false,
			rafTitle: props.raf?.title || 'Gift 2 months free access to the FT',
			rafDescription:
				props.raf?.description ||
				"Instead of sharing this article, gift free full access. Share this link with your friend or colleague for them to get free access for 60 days. By sharing this link, you confirm that you have your friend's consent to do so.",

			urls: {
				raf: props.raf?.url || 'https://www.ft.com/join/licence/aa618a29-4699-4aca-ba3c-ce4d0b22e190/details',
				dummy: 'https://on.ft.com/gift_link',
				gift: undefined,
				enterprise: undefined,
				nonGift: `${props.article.url}?shareType=nongift`
			},

			mailtoUrls: {
				gift: undefined,
				enterprise: undefined,
				nonGift: createMailtoUrl(props.article.title, `${props.article.url}?shareType=nongift`)
			},

			mobileShareLinks: props.showMobileShareLinks
				? {
						facebook: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(
							props.article.url
						)}&t=${encodeURIComponent(props.article.title)}`,
						twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
							props.article.url
						)}&text=${encodeURIComponent(props.article.title)}&via=financialtimes`,
						linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
							props.article.url
						)}&title=${encodeURIComponent(props.article.title)}&source=Financial+Times`,
						whatsapp: `whatsapp://send?text=${encodeURIComponent(
							props.article.title
						)}%20-%20${encodeURIComponent(props.article.url)}`
				  }
				: undefined
		}

		const expandedProps = Object.assign({}, props, initialState)
		const sectionProps = props.isFreeArticle
			? updaters.showNonGiftUrlSection(expandedProps)
			: updaters.showGiftUrlSection(expandedProps)

		return Object.assign(initialState, sectionProps)
	}
)

const BaseGiftArticle = (props) => {
	return props.isLoading ? <Loading /> : <Form {...props} />
}

const GiftArticle = withGiftFormActions(BaseGiftArticle)

export { GiftArticle }
