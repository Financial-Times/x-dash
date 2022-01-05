import { getLocalisedISODate, getTitleForItemGroup, getDateOnly } from './date'

const groupItemsByLocalisedDate = (
	indexOffset,
	replaceLocalDate,
	localTodayDateTime,
	items,
	timezoneOffset
) => {
	const itemsByLocalisedDate = {}

	items.forEach((item, index) => {
		const localDateTime = getLocalisedISODate(item.publishedDate, timezoneOffset)
		const localDate = getDateOnly(localDateTime)

		if (!itemsByLocalisedDate.hasOwnProperty(localDate)) {
			itemsByLocalisedDate[localDate] = []
		}

		item.localisedLastUpdated = localDateTime
		itemsByLocalisedDate[localDate].push({ articleIndex: indexOffset + index, ...item })
	})

	const localTodayDate = localTodayDateTime && getDateOnly(localTodayDateTime)
	return Object.entries(itemsByLocalisedDate).map(([localDate, items]) => ({
		date: replaceLocalDate && localDate === localTodayDate ? 'today-earlier' : localDate,
		items
	}))
}

const splitLatestItems = (items, localTodayDate, latestItemsTime) => {
	const latestNews = []
	const remainingItems = []

	items.forEach((item, index) => {
		// These are ISO date strings so string comparison works when comparing them if they are in the same timezone
		if (latestItemsTime && item.publishedDate > latestItemsTime) {
			latestNews.push({ articleIndex: index, ...item })
		} else {
			remainingItems.push(item)
		}
	})

	return [latestNews, remainingItems]
}

const addItemGroupTitles = (itemGroups, localTodayDate) => {
	return itemGroups.map((group) => {
		group.title = getTitleForItemGroup(group.date, localTodayDate)

		return group
	})
}

const isTimeWithinAgeRange = (time, localTodayDate, ageRangeHours) =>
	time && new Date(localTodayDate) - new Date(time) < ageRangeHours * 60 * 60 * 1000

const isTimeWithinToday = (time, localTodayDate) => time && getDateOnly(localTodayDate) === getDateOnly(time)

/**
 * Determines whether a "Latest News" section can be shown in the timeline.
 *
 * A "Latest News" section is allowed if `latestItemsTime` is specified and lies within the
 * permitted time range. This time age range defaults to "today", but can be overridden using
 * `latestItemsAgeRange`.
 *
 * @param {string} localTodayDate  Today's date in client timezone. ISO Date string format.
 * @param {string} latestItemsTime  Cutoff time for items to be treated as "Latest News". ISO Date string format.
 * @param {number} latestItemsAgeRange  Maximum age allowed for items in "Latest News". Hours.
 * @returns {boolean} true if a "Latest News" section can be shown.
 */
const isLatestNewsSectionAllowed = (localTodayDate, latestItemsTime, latestItemsAgeRange) =>
	latestItemsAgeRange
		? isTimeWithinAgeRange(latestItemsTime, localTodayDate, latestItemsAgeRange)
		: isTimeWithinToday(latestItemsTime, localTodayDate)

/**
 * Groups items (articles) by date
 *
 * Takes an array of article items and groups them into sections by date.
 * Gives the groups presentable titles, e.g. "Earlier Today", and "Yesterday".
 * Will include a "Latest News" group if allowed by `latestItemsTime` and `latestItemsAgeRange`.
 *
 * @param {Item[]} items  An array of news articles.
 * @param {number} timezoneOffset  Minutes ahead (negative) or behind UTC
 * @param {string} localTodayDate  Today's date in client timezone. ISO Date string format.
 * @param {string} latestItemsTime  Cutoff time for items to be treated as "Latest News". ISO Date string format.
 * @param {number} latestItemsAgeRange  Maximum age allowed for items in "Latest News". Hours.
 * @returns An array of group objects, each containing the group's title, date and items.
 */
const getItemGroups = ({
	items,
	timezoneOffset,
	localTodayDate,
	latestItemsTime,
	latestItemsAgeHours: latestItemsAgeRange
}) => {
	if (!items || !Array.isArray(items) || items.length === 0) {
		return []
	}

	const sortedItems = [...items].sort((a, b) => (a.publishedDate > b.publishedDate ? -1 : 1))

	const includeLatesNewsSection = isLatestNewsSectionAllowed(
		localTodayDate,
		latestItemsTime,
		latestItemsAgeRange
	)

	const [latestItems, remainingItems] = includeLatesNewsSection
		? splitLatestItems(sortedItems, localTodayDate, latestItemsTime)
		: [[], sortedItems]

	const itemGroups = groupItemsByLocalisedDate(
		latestItems.length,
		includeLatesNewsSection,
		localTodayDate,
		remainingItems,
		timezoneOffset
	)

	if (latestItems.length > 0) {
		itemGroups.unshift({
			date: 'today-latest',
			items: latestItems
		})
	}

	return addItemGroupTitles(itemGroups, localTodayDate)
}

/**
 * Looks up for a article index that matches the provided position
 * and returns its group index and its item index withing the group.
 */
const getGroupAndIndex = (groups, position) => {
	if (position === 0) {
		return {
			group: 0,
			index: 0
		}
	}

	return groups
		.map((group, groupIndex) => {
			const articleIndexInGroup = group.items.findIndex((item) => item.articleIndex === position - 1)
			if (articleIndexInGroup >= 0) {
				return {
					group: groupIndex,
					index: articleIndexInGroup + 1
				}
			}
		})
		.filter((a) => a)
		.pop()
}

/**
 * Creates a deep copy of a groupedItems data structure.
 */
const deepCopyGroupedItems = (groupedItems) =>
	Array.from(groupedItems, (v, k) => ({
		...groupedItems[k],
		items: [...groupedItems[k].items]
	}))

export const interleaveAllSlotsWithCustomSlots = (
	customSlotContentArray,
	customSlotPositionArray,
	itemGroups,
	items
) => {
	const interleavedItemGroups = deepCopyGroupedItems(itemGroups)

	for (const [index, slotContent] of customSlotContentArray.entries()) {
		const insertPosition = Math.min(customSlotPositionArray[index], items.length + index)
		const insert = getGroupAndIndex(interleavedItemGroups, insertPosition)

		if (insert) {
			interleavedItemGroups[insert.group].items.splice(insert.index, 0, slotContent)
		}
	}

	return interleavedItemGroups
}

export const buildModel = ({
	items,
	customSlotContent,
	customSlotPosition,
	timezoneOffset,
	localTodayDate,
	latestItemsTime,
	latestItemsAgeHours
}) => {
	const itemGroups = getItemGroups({
		items,
		timezoneOffset,
		localTodayDate,
		latestItemsTime,
		latestItemsAgeHours
	})

	if (itemGroups.length > 0 && customSlotContent) {
		const customSlotContentArray = Array.isArray(customSlotContent) ? customSlotContent : [customSlotContent]
		const customSlotPositionArray = Array.isArray(customSlotPosition)
			? customSlotPosition
			: [customSlotPosition]

		return interleaveAllSlotsWithCustomSlots(
			customSlotContentArray,
			customSlotPositionArray,
			itemGroups,
			items
		)
	}

	return itemGroups
}
