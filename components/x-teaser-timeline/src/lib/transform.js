import {
	getLocalisedISODate,
	getTitleForItemGroup,
	splitLatestEarlier,
	getDateOnly
} from './date';


const groupItemsByLocalisedDate = (items, timezoneOffset) => {
	const itemsByLocalisedDate = {};

	items.forEach((item, index) => {
		const localDateTime = getLocalisedISODate(item.publishedDate, timezoneOffset);
		const localDate = getDateOnly(localDateTime);

		if (!itemsByLocalisedDate.hasOwnProperty(localDate)) {
			itemsByLocalisedDate[localDate] = [];
		}

		item.localisedLastUpdated = localDateTime;
		itemsByLocalisedDate[localDate].push({ articleIndex: index, ...item });
	});

	return Object.entries(itemsByLocalisedDate).map(([localDate, items]) => ({
		date: localDate,
		items
	}));
};

const splitTodaysItems = (itemGroups, localTodayDate, latestItemsTime) => {
	const firstGroupIsToday = itemGroups[0] && itemGroups[0].date === localTodayDate;
	const latestTimeIsToday = getDateOnly(latestItemsTime) === localTodayDate;

	if (!firstGroupIsToday || !latestTimeIsToday) {
		return itemGroups;
	}

	const { latestItems, earlierItems } = splitLatestEarlier(itemGroups[0].items, latestItemsTime);
	const splitGroups = [];

	if (latestItems.length) {
		splitGroups.push({
			date: 'today-latest',
			items: latestItems
		});
	}

	if (earlierItems.length) {
		splitGroups.push({
			date: 'today-earlier',
			items: earlierItems
		});
	}

	if (splitGroups.length) {
		itemGroups.splice(0, 1, ...splitGroups);
	}

	return itemGroups;
};

const addItemGroupTitles = (itemGroups, localTodayDate) => {
	return itemGroups.map(group => {
		group.title = getTitleForItemGroup(group.date, localTodayDate);

		return group;
	});
};

const getItemGroups = ({items, timezoneOffset, localTodayDate, latestItemsTime}) => {
	if (!items || !Array.isArray(items) || items.length === 0) {
		return [];
	}

	let itemGroups = groupItemsByLocalisedDate(items, timezoneOffset);

	if (latestItemsTime) {
		itemGroups = splitTodaysItems(itemGroups, localTodayDate, latestItemsTime);
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

export const buildModel = ({items, customSlotContent, customSlotPosition, timezoneOffset, localTodayDate, latestItemsTime}) => {
	const itemGroups = getItemGroups({items, timezoneOffset, localTodayDate, latestItemsTime});

	if (itemGroups.length > 0 && customSlotContent) {
		const insertPosition = Math.min(customSlotPosition, items.length);
		const insert = getGroupAndIndex(itemGroups, insertPosition);
		const copyOfItems = [...itemGroups[insert.group].items];

		copyOfItems.splice(insert.index, 0, customSlotContent);

		itemGroups[insert.group].items = copyOfItems;
	}
	return itemGroups;
};
