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

const getItemGroups = ({sortedItems, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours}) => {
	if (!sortedItems || !Array.isArray(sortedItems) || sortedItems.length === 0) {
		return [];
	}

	const isLatestItemTimeWithinRange = latestItemsAgeHours ?
		latestItemsTime && (new Date(localTodayDate)-new Date(latestItemsTime)) < (latestItemsAgeHours * 60 * 60 * 1000) :
		latestItemsTime && (getDateOnly(localTodayDate) === getDateOnly(latestItemsTime));

	const [latestItems,remainingItems] = isLatestItemTimeWithinRange ? splitLatestItems(sortedItems, localTodayDate, latestItemsTime) : [[],sortedItems];

	let itemGroups = groupItemsByLocalisedDate(latestItems.length, isLatestItemTimeWithinRange, localTodayDate, remainingItems, timezoneOffset);

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
	const sortedItems = items ? [...items].sort( (a,b) => a.publishedDate > b.publishedDate ? -1 : 1 ) : [];
	const itemGroups = getItemGroups({sortedItems, timezoneOffset, localTodayDate, latestItemsTime, latestItemsAgeHours});

	if (itemGroups.length > 0 && customSlotContent) {
		const insertPosition = Math.min(customSlotPosition, items.length);
		const insert = getGroupAndIndex(itemGroups, insertPosition);
		const copyOfItems = [...itemGroups[insert.group].items];

		copyOfItems.splice(insert.index, 0, customSlotContent);

		itemGroups[insert.group].items = copyOfItems;
	}
	return itemGroups;
};
