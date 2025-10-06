/**
 * Checks if the user can share with non-subscriber users
 * @param {giftCredits: number, enterpriseHasCredits: boolean } param0
 * @returns {boolean}
 */
export const canShareWithNonSubscribers = ({ giftCredits, enterpriseHasCredits }) =>
	giftCredits > 0 || enterpriseHasCredits

export const isNonSubscriberOption = ({ showNonSubscriberOptions, showAdvancedSharingOptions }) =>
	showNonSubscriberOptions || showAdvancedSharingOptions

export const trimHighlights = (text, maxWordsCount = 30) =>
	text.split(' ').length > maxWordsCount ? `${text.split(' ').slice(0, maxWordsCount).join(' ')} ...` : text
