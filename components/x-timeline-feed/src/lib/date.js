import { format, isAfter, isToday, isYesterday, subMinutes } from 'date-fns';

/**
 * Takes a UTC ISO date/time and turns it into a ISO date for a particular timezone
 * @param {string} isoDate         A UTC ISO date, e.g. '2018-07-19T12:00:00.000Z'
 * @param {number} timezoneOffset  Minutes ahead (negative) or behind UTC
 * @return {string}                A localised ISO date, e.g. '2018-07-19T00:30:00.000+01:00' for UTC+1
 */
export const getLocalisedISODate = (isoDate, timezoneOffset) => {
	const dateWithoutTimezone = subMinutes(isoDate, timezoneOffset).toISOString().substring(0, 23);
	const future = timezoneOffset <= 0;
	const offsetMinutes = Math.abs(timezoneOffset);
	const hours = Math.floor(offsetMinutes / 60);
	const minutes = offsetMinutes % 60;
	const pad = n => String(n).padStart(2, '0');

	return `${dateWithoutTimezone}${future ? '+' : '-'}${pad(hours)}:${pad(minutes)}`;
};

export const getLocalisedTodayDate = timezoneOffset => {
	const localToday = subMinutes(new Date(), timezoneOffset);

	return format(localToday, 'YYYY-MM-DD');
};

export const getTitleForArticleDateGroup = localDate => {
	if (isToday(localDate)) {
		return 'Earlier Today';
	}

	if (isYesterday(localDate)) {
		return 'Yesterday';
	}

	return format(localDate, 'MMMM D, YYYY');
};

export const splitLatestEarlier = (articles, splitDate) => {
	const latestArticles = [];
	const earlierArticles = [];

	articles.forEach(article => {
		if (isAfter(article.localisedLastUpdated, splitDate)) {
			latestArticles.push(article);
		} else {
			earlierArticles.push(article);
		}
	});

	return { latestArticles, earlierArticles };
};
