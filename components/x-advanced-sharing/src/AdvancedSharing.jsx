import { h } from '@financial-times/x-engine'
import { withActions } from '@financial-times/x-interaction'

import Loading from './Loading'
import Form from './Form'

import ApiClient from './lib/api'
import { copyToClipboard, createMailtoUrl } from './lib/share-link-actions'
import tracking from './lib/tracking'
import * as updaters from './lib/updaters'

const isCopySupported =
	typeof document !== 'undefined' && document.queryCommandSupported && document.queryCommandSupported('copy')

const withGiftFormActions = withActions(
	(initialProps) => {
		const api = new ApiClient({
			protocol: initialProps.apiProtocol,
			domain: initialProps.apiDomain
		})

		return {
			showAdvancedSharingUrlSection() {
				return updaters.showAdvancedSharingUrlSection
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
				const { redemptionUrl, redemptionLimit } = await api.getAdvancedSharingUrl(initialProps.article.id)

				if (redemptionUrl) {
					const { url, isShortened } = await api.getShorterUrl(redemptionUrl)
					tracking.createAdvancedSharingLink(url, redemptionUrl)

					return updaters.setGiftUrl(url, redemptionLimit, isShortened)
				} else {
					// TODO do something
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

			emailNonGiftUrl() {
				return (state) => {
					tracking.emailLink('nonGiftLink', state.urls.nonGift)
				}
			},

			hideCopyConfirmation() {
				return { showCopyConfirmation: false }
			},

			shareByNativeShare() {
				throw new Error(`shareByNativeShare should be implemented by x-advanced-sharing's consumers`)
			},

			activate() {
				return async (state) => {
					if (initialProps.isFreeArticle) {
						const { url, isShortened } = await api.getShorterUrl(state.urls.nonGift)

						if (isShortened) {
							return updaters.setShortenedNonGiftUrl(url)(state)
						}
					} else {
						const { giftCredits, monthlyAllowance, nextRenewalDate } = await api.getAdvancedSharingAllowance()

						// avoid to use giftCredits >= 0 because it returns true when null and ""
						if (giftCredits > 0 || giftCredits === 0) {
							return updaters.setAllowance(giftCredits, monthlyAllowance, nextRenewalDate)
						} else {
							return { invalidResponseFromApi: true }
						}
					}
				}
			}
		}
	},
	(props) => {
		const initialState = {
			userOrganisation: 'Your Organisation',
			giftCredits: undefined,
			monthlyAllowance: undefined,
			showCopyButton: isCopySupported,
			isGiftUrlCreated: false,
			isGiftUrlShortened: false,
			isNonGiftUrlShortened: false,

			urls: {
				dummy: 'https://on.ft.com/gift_link',
				gift: undefined,
				external: `${props.article.url}?shareType=external`
			},

			mailtoUrls: {
				gift: undefined,
				external: createMailtoUrl(props.article.title, `${props.article.url}?shareType=external`)
			}
		}

		const expandedProps = Object.assign({}, props, initialState)
		const sectionProps = props.isFreeArticle
			? updaters.showNonGiftUrlSection(expandedProps)
			: updaters.showAdvancedSharingUrlSection(expandedProps)

		return Object.assign(initialState, sectionProps)
	}
)

const BaseAdvancedSharing = (props) => {
	return props.isLoading ? <Loading /> : <Form {...props} />
}

const AdvancedSharing = withGiftFormActions(BaseAdvancedSharing)

export { AdvancedSharing }
