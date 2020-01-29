import {
	getLocalisedISODate,
	getTitleForItemGroup,
	getDateOnly
} from './date';

const groupItemsByLocalisedDate = (indexOffset, replaceLocalDate, localTodayDateTime, items, timezoneOffset) => {
	const itemsByLocalisedDate = {};

	items.forEach((item, index) => {
		const localDateTime = getLocalisedISODate(item.publishedDate, timezoneOffset);
		const localDate = getDateOnly(localDateTime);

		if (!itemsByLocalisedDate.hasOwnProperty(localDate)) {
			itemsByLocalisedDate[localDate] = [];
		}

		item.localisedLastUpdated = localDateTime;
		itemsByLocalisedDate[localDate].push({ articleIndex: indexOffset + index, ...item });
	});

	const localTodayDate = localTodayDateTime && getDateOnly(localTodayDateTime);
	return Object.entries(itemsByLocalisedDate).map(([localDate, items]) => ({
		date: replaceLocalDate && localDate === localTodayDate ? 'today-earlier' : localDate,
		items
	}));
};

const splitLatestItems = (items, localTodayDate, latestItemsTime) => {
	const latestNews = [];
	const remainingItems = [];

	items.forEach( (item,index) => {
		// These are ISO date strings so string comparison works when comparing them if they are in the same timezone
		if( latestItemsTime && item.publishedDate > latestItemsTime ) {
			latestNews.push({ articleIndex: index, ...item });
		} else {
			remainingItems.push(item);
		}
	});

	return [latestNews,remainingItems];
};

const addItemGroupTitles = (itemGroups, localTodayDate) => {
	return itemGroups.map(group => {
		group.title = getTitleForItemGroup(group.date, localTodayDate);

		return group;
	});
};

const isTimeWithinAgeRange = (time, localTodayDate, ageRangeHours) =>
	time && (new Date(localTodayDate) - new Date(time)) < (ageRangeHours * 60 * 60 * 1000);

const isTimeWithinToday = (time, localTodayDate) =>
	time && (getDateOnly(localTodayDate) === getDateOnly(time));

/**
 * Groups items (articles) by date
 *
 * Takes an array of article items and groups them into sections by date.
 * Gives the groups presentable titles, e.g. "Earlier Today", and "Yesterday".
 * Will try to create a "Latest News" section if `latestItemsTime` is specified and there are articles within the
 * permitted age range. This range can be set using `latestItemsAgeRange`.
 *
 * @param {Item[]} items  An array of news articles.
 * @param {number} timezoneOffset  Minutes ahead (negative) or behind UTC
 * @param {string} localTodayDate  Today's date in client timezone. ISO Date string format.
 * @param {string} latestItemsTime  Cutoff time for items to be treated as "Latest News". ISO Date string format.
 * @param {number} latestItemsAgeRange  Maximum age allowed for items in "Latest News". Hours.
 * @returns An array of group objects, each containing the group's title, date and items.
 */
const getItemGroups = ({items, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours: latestItemsAgeRange}) => {
	if (!items || !Array.isArray(items) || items.length === 0) {
		return [];
	}

	const sortedItems = items ? [...items].sort( (a,b) => a.publishedDate > b.publishedDate ? -1 : 1 ) : [];

	const includeLatestItemsSection = latestItemsAgeRange ?
		isTimeWithinAgeRange(latestItemsTime, localTodayDate, latestItemsAgeRange) :
		isTimeWithinToday(latestItemsTime, localTodayDate);

	const [latestItems,remainingItems] = includeLatestItemsSection ? splitLatestItems(sortedItems, localTodayDate, latestItemsTime) : [[],sortedItems];

	let itemGroups = groupItemsByLocalisedDate(latestItems.length, includeLatestItemsSection, localTodayDate, remainingItems, timezoneOffset);

	if (latestItems.length > 0) {
		itemGroups = [
			{
				date: 'today-latest',
				items: latestItems
			},
			...itemGroups
		];
	}

	return addItemGroupTitles(itemGroups, localTodayDate);
};

const getGroupAndIndex = (groups, position) => {
	if (position > 0) {
		const group = groups.findIndex(g => g.items.some(item => item.articleIndex === position - 1));
		const index = groups[group].items.findIndex(item => item.articleIndex === position - 1);

		return {
			group: group,
			index: index + 1
		};
	}

	return {
		group: 0,
		index: 0
	};
};

export const buildModel = ({items, customSlotContent, customSlotPosition, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours}) => {
	const itemGroups = getItemGroups({items, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours});

	if (itemGroups.length > 0 && customSlotContent) {
		const insertPosition = Math.min(customSlotPosition, items.length);
		const insert = getGroupAndIndex(itemGroups, insertPosition);
		const copyOfItems = [...itemGroups[insert.group].items];

		copyOfItems.splice(insert.index, 0, customSlotContent);

		itemGroups[insert.group].items = copyOfItems;
	}
	return itemGroups;
};
