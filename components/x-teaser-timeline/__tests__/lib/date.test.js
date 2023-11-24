import { getLocalisedISODate, getTitleForItemGroup } from '../../src/lib/date'

describe('getLocalisedISODate', () => {
	it('should return dates with future timezones in the format of date + time difference', () => {
		const dateInFuture = getLocalisedISODate('2020-01-01T00:00:00.000Z', 60)
		expect(dateInFuture).toEqual('2019-12-31T23:00:00.000-01:00')
	})
	it('should return dates with past timezones in the format of date - time difference', () => {
		const dateInPast = getLocalisedISODate('2020-01-01T00:00:00.000Z', -60)
		expect(dateInPast).toEqual('2020-01-01T01:00:00.000+01:00')
	})
	it('should return dates with no timezones in the format of date + 0 time difference', () => {
		const dateInPresent = getLocalisedISODate('2020-01-01T00:00:00.000Z', 0)
		expect(dateInPresent).toEqual('2020-01-01T00:00:00.000+00:00')
	})
})

describe('getTitleForItemGroup', () => {
	it('Should return string matchings for today-latest and today-earlier', () => {
		const latest = getTitleForItemGroup('today-latest', 'foo')

		expect(latest).toBe('Latest News')

		const earlier = getTitleForItemGroup('today-earlier', 'foo')
		expect(earlier).toBe('Earlier Today')
	})
	it('should return Earlier Today when provided with matching dates', () => {
		const earlier = getTitleForItemGroup(new Date().toDateString(), new Date().toDateString())
		expect(earlier).toBe('Earlier Today')
	})
	it('Should return yesterday when provided two dates that are one day apart', () => {
		const yesterday = getTitleForItemGroup('2019-01-01', '2019-01-02')
		expect(yesterday).toBe('Yesterday')
	})
	describe('multiple days apart', () => {
		it('should return the date in the format of MMMM d, yyyy', () => {
			const date = getTitleForItemGroup('2019-01-01', '2019-01-03')
			expect(date).toBe('January 1, 2019')
		})
	})
})
