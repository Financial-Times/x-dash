import { getLocalisedISODate, getTitleForItemGroup, getDateOnly } from './date'

/**
 * @typedef { Array<string> | Array<Object> | Object | string } CustomSlotContent
 * @typedef { Array<number> | number } CustomSlotPosition
 */

/**
 * A news item (an article).
 * @typedef {Object} Item
 * @property {string} id e.g., '01f0b004-36b9-11ea-a6d3-9a26f8c3cba4'
 * @property {string} title e.g.,'Europeans step up pressure on Iran over nuclear deal'
 * @property {string} publishedDate e.g., '2020-01-14T11:10:26.000Z'
 */

/**
 * Extra props added to an item in groups.
 * @typedef {Object} ItemInGroupInfo
 * @property {number} articleIndex
 * @property {string} localisedLastUpdated e.g., '2020-01-14T11:10:26.000+00:00'
 */

/** A news item (an article) in a group of items.
 * @typedef {(Item & ItemInGroupInfo)} ItemInGroup
 */

/**
 * A list of news published on the same date.
 * @typedef {Object} GroupOfItems
 * @property {string} title e.g., 'Earlier Today'
 * @property {string} date e.g., '2020-01-14'
 * @property {Array<ItemInGroup>} items An array of news articles.
 */

/**
 * @typedef {Object} PositionInGroup
 * @property {number} group
 * @property {number} index
 */

/**
 * @param {number} indexOffset
 * @param {boolean} replaceLocalDate
 * @param {string} localTodayDateTime
 * @param {Array<Item>} items
 * @param {number} timezoneOffset
 * @returns {Array<GroupOfItems>}
 */
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

/**
 * @param {Array<Item>} items
 * @param {string} latestItemsTime
 * @returns {Array<Array<ItemInGroup>,Array<Item>>}
 */
const splitLatestItems = (items, latestItemsTime) => {
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

/**
 * @param {Array<GroupOfItems>} itemGroups
 * @param {string} localTodayDate
 * @returns {Array<GroupOfItems>}
 */
const addItemGroupTitles = (itemGroups, localTodayDate) => {
	return itemGroups.map((group) => {
		group.title = getTitleForItemGroup(group.date, localTodayDate)

		return group
	})
}

/**
 * @param {string} time
 * @param {string} localTodayDate
 * @param {number} ageRangeHours
 * @returns {Date}
 */
const isTimeWithinAgeRange = (time, localTodayDate, ageRangeHours) =>
	time && new Date(localTodayDate) - new Date(time) < ageRangeHours * 60 * 60 * 1000

/**
 * @param {string} time
 * @param {string} localTodayDate
 * @returns {boolean}
 */
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
 * Groups items (articles) by date.
 *
 * Takes an array of article items and groups them into sections by date.
 * Gives the groups presentable titles, e.g. "Earlier Today", and "Yesterday".
 * Will include a "Latest News" group if allowed by `latestItemsTime` and `latestItemsAgeRange`.
 *
 * @param {Array<Item>} items  An array of news articles.
 * @param {number} timezoneOffset  Minutes ahead (negative) or behind UTC
 * @param {string} localTodayDate  Today's date in client timezone. ISO Date string format.
 * @param {string} latestItemsTime  Cutoff time for items to be treated as "Latest News". ISO Date string format.
 * @param {number} latestItemsAgeRange  Maximum age allowed for items in "Latest News". Hours.
 * @returns {Array<GroupOfItems>} An array of group objects, each containing the group's title, date and items.
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
		? splitLatestItems(sortedItems, latestItemsTime)
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
 * Looks up for an item that matches the position provided as arg,
 * and returns its `coordinates` within the array of group of items:
 * the group index and the item index
 *
 * e.g., given the array of group of items below
 * ```
 * Array<GroupOfItems> [
 * 	{date, title, items: [item0, item1, item2]},				// <-- #0 group
 * 	{date, title, items: [item3, item4, item5, item6, item7]},  // <-- #1 group
 * 	{date, title, items: [item8, item9]},						// <-- #2 group
 * ]
 * ```
 *
 * and the position 5 as arguments to the function,
 * then it would return `{ group: 1, index: 2 }`, which corresponds to item5
 * in the illustration above.
 * @param {Array<GroupOfItems>} groups
 * @param {number} position
 * @returns {PositionInGroup}
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
 * Creates a deep copy of an array of GroupOfItems data structure.
 * @param {Array<GroupOfItems>} groupedItems
 * @return {Array<GroupOfItems>}
 */
const deepCopyGroupedItems = (groupedItems) =>
	Array.from(groupedItems, (v, k) => ({
		...groupedItems[k],
		items: [...groupedItems[k].items]
	}))

/**
 * Inserts each custom slot into the appropriate group of items,
 * so that the custom slot will appear in the expected
 * position - specified via the positions array arg - in the teaser timeline.
 * @param {CustomSlotContent} customSlotContentArray
 * @param {CustomSlotPosition} customSlotPositionArray
 * @param {Array<GroupOfItems>} itemGroups
 * @param {Array<Items>} items
 * @returns {Array<GroupOfItems>}
 */
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

/**
 * @typedef {Object} buildModelProps
 * @property {Array<Item>} items
 * @property {CustomSlotContent} customSlotContent
 * @property {CustomSlotPosition} customSlotPosition
 * @property {number} timezoneOffset
 * @property {string} localTodayDate e.g., '2020-01-14'
 * @property {string} latestItemsTime e.g., '2020-01-13T10:00:00+00:00'
 * @property {number} latestItemsAgeHours e.g., 36
 *
 * Builds the XTeaserTimeline data model.
 * The list of news items passed as argument is divided into groups of items,
 * where each group identifies a specific date when the subset of news was published.
 * Custom slots - e.g., ads - are also inserted into their expected position.
 * @param {buildModelProps}
 * @returns {Array<GroupOfItems>}
 */
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
