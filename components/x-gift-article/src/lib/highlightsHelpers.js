export const SAVED_ANNOTATIONS_LOCAL_STORAGE_KEY = 'savedSharedAnnotations'

/**
 * We store the highlights tokens that have been saved by the user in localStorage.
 * This is so we can hide the shared annotation message for this share if the user has already saved them.
 *
 * @returns {string[]} An array of highlights tokens that have had their shared annotations saved.
 */
export const parsedSavedAnnotationsFromLocalStorage = () => {
	// Attempt to parse the savedSharedAnnotationArticleIds from localStorage.
	const savedSharedAnnotationArticleIds = JSON.parse(
		localStorage.getItem(SAVED_ANNOTATIONS_LOCAL_STORAGE_KEY) ?? '[]'
	)

	// Check that the savedSharedAnnotationArticleIds is an array.
	if (!Array.isArray(savedSharedAnnotationArticleIds)) {
		return []
	}

	// Check that the savedSharedAnnotationArticleIds includes only strings.
	const savedSharedAnnotationArticleIdsAreValid = savedSharedAnnotationArticleIds.every(
		(articleId) => typeof articleId === 'string'
	)

	if (!savedSharedAnnotationArticleIdsAreValid) {
		return []
	}

	return savedSharedAnnotationArticleIds
}

/**
 * Checks if the user can share with non-subscriber users
 * @param {giftCredits: number, enterpriseHasCredits: boolean } param0
 * @returns {boolean}
 */
export const canShareWithNonSubscribers = ({ giftCredits, enterpriseHasCredits }) =>
	giftCredits > 0 || enterpriseHasCredits

export const isNonSubscriberOption = ({ showNonSubscriberOptions, showAdvancedSharingOptions }) =>
	showNonSubscriberOptions || showAdvancedSharingOptions
