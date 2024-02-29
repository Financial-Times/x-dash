import { h } from '@financial-times/x-engine'
import { withActions } from '@financial-times/x-interaction'
import ApiClient from './lib/api'
import EnterpriseApiClient from './lib/enterpriseApi'
import { copyToClipboard, createMailtoUrl } from './lib/share-link-actions'
import tracking from './lib/tracking'
import * as updaters from './lib/updaters'
import { ShareType } from './lib/constants'
import ShareArticleDialog from './ShareArticleDialog'
import { parsedSavedAnnotationsFromLocalStorage } from './lib/highlightsHelpers'
import HighlightsApiClient from './lib/highlightsApi'

const isCopySupported =
	typeof document !== 'undefined' && document.queryCommandSupported && document.queryCommandSupported('copy')

const withGiftFormActions = withActions(
	(initialProps) => {
		const api = new ApiClient({
			protocol: initialProps.apiProtocol,
			domain: initialProps.apiDomain
		})
		const enterpriseApi = new EnterpriseApiClient(initialProps.enterpriseApiBaseUrl)

		const highlightsApiClient = new HighlightsApiClient()

		return {
			showGiftUrlSection() {
				return updaters.showGiftUrlSection
			},

			showEnterpriseUrlSection() {
				return updaters.showGiftEnterpriseSection
			},

			showNonSubscriberSharingOptions() {
				return updaters.showNonSubscriberSharingOptions
			},

			showNonGiftUrlSection() {
				return updaters.showNonGiftUrlSection
			},

			showAdvancedSharingOptions() {
				return updaters.showAdvancedSharingOptions
			},

			hideNonSubscriberSharingOptions() {
				return updaters.hideNonSubscriberSharingOptions
			},

			async createGiftUrl() {
				return async (state) => {
					let response
					const { highlightsAccessToken } = await highlightsApiClient.shareHighlights(
						initialProps.article.id,
						state.includeHighlights
					)
					response = await api.getGiftUrl(initialProps.article.id, highlightsAccessToken)
					const { redemptionUrl, redemptionLimit } = response
					if (redemptionUrl) {
						const { url, isShortened } = await api.getShorterUrl(redemptionUrl)
						tracking.createGiftLink(url, redemptionUrl)

						return updaters.setGiftUrl(url, redemptionLimit, isShortened)(state)
					} else {
						return updaters.setErrorState(true)
					}
				}
			},

			async shortenNonGiftUrl() {
				return async (state) => {
					if (state.isNonGiftUrlShortened) {
						state.showFreeArticleAlert = false
						return state
					}

					const nonGiftUrl = new URL(state.urls.nonGift)
					const { highlightsAccessToken } = await highlightsApiClient.shareHighlights(
						initialProps.article.id,
						state.includeHighlights
					)
					if (highlightsAccessToken) {
						nonGiftUrl.searchParams.append('highlights', highlightsAccessToken)
					}

					const { url, isShortened } = await api.getShorterUrl(nonGiftUrl.toString())
					tracking.createNonGiftLink(url, state.urls.nonGift)

					if (isShortened) {
						return updaters.setShortenedNonGiftUrl(url)(state)
					} else {
						return updaters.setErrorState(true)
					}
				}
			},

			async createEnterpriseUrl() {
				return async (state) => {
					const { redemptionUrl, redemptionLimit } = await enterpriseApi.getESUrl(
						initialProps.article.id,
						state.includeHighlights
					)

					if (redemptionUrl) {
						tracking.createESLink(redemptionUrl)

						const sharesCount = document.cookie.match(new RegExp(`(^| )ES_COUNT=([^;]+)`))?.at(2)
						if (Number(sharesCount) === 1) {
							const firstUseEvent = new Event('advanced-sharing-first-use')
							document.dispatchEvent(firstUseEvent)
						}

						return updaters.setGiftUrl(redemptionUrl, redemptionLimit, false, true)(state)
					} else {
						return updaters.setErrorState(true)
					}
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

			shareByNativeShare() {
				throw new Error(`shareByNativeShare should be implemented by x-gift-article's consumers`)
			},

			activate() {
				return async (state) => {
					const { enabled, limit, hasCredits, requestAccess } =
						await enterpriseApi.getEnterpriseArticleAllowance()

					const advancedSharingEnabled = enabled && !requestAccess

					const enterpriseState = {
						enterpriseLimit: limit,
						enterpriseHasCredits: hasCredits,
						enterpriseRequestAccess: requestAccess,
						showAdvancedSharingOptions: advancedSharingEnabled,
						showNonSubscriberOptions: true,
						shareType: advancedSharingEnabled ? ShareType.enterprise : undefined
					}

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
						const freeArticleState = {
							invalidResponseFromApi: true,
							enterpriseEnabled: enabled,
							...enterpriseState
						}

						if (isShortened) {
							Object.assign(freeArticleState, updaters.setShortenedNonGiftUrl(url)(state))
							freeArticleState.showFreeArticleAlert = true
						}

						return freeArticleState
					} else {
						const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getGiftArticleAllowance()

						// avoid to use giftCredits >= 0 because it returns true when null and ""
						if (giftCredits > 0 || giftCredits === 0) {
							return {
								...updaters.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate),
								shareType: ShareType.nonGift,
								enterpriseEnabled: enabled,
								...enterpriseState
							}
						} else {
							return {
								invalidResponseFromApi: true,
								enterpriseEnabled: enabled,
								test: true,
								...enterpriseState
							}
						}
					}
				}
			},
			setIncludeHighlights(includeHighlights) {
				return (state) => {
					state.includeHighlights = includeHighlights
					return { includeHighlights }
				}
			},
			checkIfHasHighlights() {
				return (state) => {
					state.hasHighlights = !!document.getElementsByClassName(state.highlightClassName).length
					return { hasHighlights: state.hasHighlights }
				}
			},
			saveHighlightsHandler() {
				return () => {
					return {
						showHighlightsRecipientMessage: false,
						showHighlightsSuccessMessage: true,
						showHighlightsCheckbox: true
					}
				}
			},
			closeHighlightsRecipientMessage() {
				return () => {
					return {
						showHighlightsRecipientMessage: false
					}
				}
			},
			closeHighlightsSuccessMessage() {
				return () => {
					return {
						showHighlightsSuccessMessage: false
					}
				}
			}
		}
	},
	(props) => {
		const url = new URL(location.href)
		const params = new URLSearchParams(url.search)
		const highlightsToken = params.get('highlights')

		const userIsAHighlightsRecipient = url.searchParams.has('highlights')
		const userHasNotYetSavedSharedAnnotations =
			!parsedSavedAnnotationsFromLocalStorage().includes(highlightsToken)

		// We use the absence of the missing-highlight-message class to determine
		// if the highlights have not been removed.
		const highlightsHaveNotBeenRemoved = document.querySelector('.missing-highlight-message') === null

		// We only want to display the highlights recipient message if:
		// - The user is a highlights recipient
		// - Has not yet saved the shared annotations for this highlight token.
		// - Has visited an article that hasn't changed since the highlights were shared (if it had changed, the highlights would have been removed).
		const showHighlightsRecipientMessage =
			userIsAHighlightsRecipient && userHasNotYetSavedSharedAnnotations && highlightsHaveNotBeenRemoved

		const initialState = {
			title: 'Share this article With:',
			giftCredits: undefined,
			monthlyAllowance: undefined,
			showCopyButton: isCopySupported,
			isGiftUrlCreated: false,
			isGiftUrlShortened: false,
			isNonGiftUrlShortened: false,
			includeHighlights: false,
			showAdvancedSharingOptions: false,
			showNonSubscriberOptions: false,
			hasHighlights: false,
			showHighlightsRecipientMessage,
			showHighlightsSuccessMessage: false,
			showHighlightsCheckbox: !new URL(location.href).searchParams.has('highlights'),
			highlightClassName: 'user-annotation',
			urls: {
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
			showFreeArticleAlert: false
		}

		const expandedProps = Object.assign({}, props, initialState)
		const sectionProps = props.isFreeArticle
			? updaters.showNonGiftUrlSection(expandedProps)
			: updaters.showGiftUrlSection(expandedProps)

		return Object.assign(initialState, sectionProps)
	}
)

const BaseShareArticleModal = (props) => {
	return <ShareArticleDialog {...props} />
}

const ShareArticleModal = withGiftFormActions(BaseShareArticleModal)

export { ShareArticleModal }
