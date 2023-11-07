import { differenceInCalendarDays, format, isAfter, subMinutes, parseISO, parse } from 'date-fns'

/**
 * Takes a UTC ISO date/time and turns it into a ISO date for a particular timezone
 * @param {string} isoDate         A UTC ISO date, e.g. '2018-07-19T12:00:00.000Z'
 * @param {number} timezoneOffset  Minutes ahead (negative) or behind UTC
 * @return {string}                A localised ISO date, e.g. '2018-07-19T00:30:00.000+01:00' for UTC+1
 */
export const getLocalisedISODate = (isoDate, timezoneOffset) => {
	const localisedDate = parseISO(isoDate)
	const dateWithoutTimezone = subMinutes(localisedDate, timezoneOffset).toISOString().substring(0, 23)
	const future = timezoneOffset <= 0
	const offsetMinutes = Math.abs(timezoneOffset)
	const hours = Math.floor(offsetMinutes / 60)
	const minutes = offsetMinutes % 60
	const pad = (n) => String(n).padStart(2, '0')

	return `${dateWithoutTimezone}${future ? '+' : '-'}${pad(hours)}:${pad(minutes)}`
}

/**
 * @param {string} localDate
 * @param {string} localTodayDate
 * @returns {string}
 */
export const getTitleForItemGroup = (localDate, localTodayDate) => {
	if (localDate === 'today-latest') {
		return 'Latest News'
	}

	if (localDate === 'today-earlier' || localDate === localTodayDate) {
		return 'Earlier Today'
	}

	if (
		differenceInCalendarDays(
			parse(localTodayDate, 'yyyy-MM-dd', new Date()),
			parse(localDate, 'yyyy-MM-dd', new Date())
		) === 1
	) {
		return 'Yesterday'
	}

	return format(parse(localDate, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')
}

export const splitLatestEarlier = (items, splitDate) => {
	const latestItems = []
	const earlierItems = []

	items.forEach((item) => {
		if (isAfter(item.localisedLastUpdated, splitDate)) {
			latestItems.push(item)
		} else {
			earlierItems.push(item)
		}
	})

	return { latestItems, earlierItems }
}

/**
 * @param {string} date
 * @returns {string}
 */
export const getDateOnly = (date) => format(parseISO(date), 'yyyy-MM-dd')
