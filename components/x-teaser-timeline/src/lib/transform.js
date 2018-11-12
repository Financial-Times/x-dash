import {
	getLocalisedISODate,
	getTitleForItemGroup,
	splitLatestEarlier
} from './date';

export const getDateOnly = date => date.substr(0, 10);

export const groupItemsByLocalisedDate = (items, timezoneOffset) => {
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

export const splitTodaysItems = (itemGroups, localTodayDate, latestItemsTime) => {
	const firstGroupIsToday = itemGroups[0] && itemGroups[0].date === localTodayDate;
	const latestTimeIsToday = getDateOnly(latestItemsTime) === localTodayDate;

	if (!firstGroupIsToday || !latestTimeIsToday) {
		return itemGroups;
	}

	const { latestItems, earlierItems } = splitLatestEarlier(itemGroups[0].items, latestItemsTime);

	itemGroups[0] = {
		date: 'today-earlier',
		items: earlierItems
	};

	if (latestItems.length) {
		itemGroups.unshift({
			date: 'today-latest',
			items: latestItems
		});
	}

	return itemGroups;
};

export const addItemGroupTitles = (itemGroups, localTodayDate) => {
	return itemGroups.map(group => {
		group.title = getTitleForItemGroup(group.date, localTodayDate);

		return group;
	});
};

export const getItemGroups = props => {
	const now = new Date();
	const {
		items,
		timezoneOffset = now.getTimezoneOffset(),
		localTodayDate = getDateOnly(now.toISOString()),
		latestItemsTime
	} = props;

	if (!items || !Array.isArray(items) || items.length === 0) {
		return [];
	}

	let itemGroups = groupItemsByLocalisedDate(items, timezoneOffset);

	if (latestItemsTime) {
		itemGroups = splitTodaysItems(itemGroups, localTodayDate, latestItemsTime);
	}

	return addItemGroupTitles(itemGroups, localTodayDate);
};
