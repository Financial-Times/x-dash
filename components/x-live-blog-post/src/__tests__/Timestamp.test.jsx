const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import Timestamp from '../Timestamp'

function twoDaysAgo() {
	const now = new Date()
	const twoDays = 2 * 24 * 60 * 60 * 1000
	return new Date(now.getTime() - twoDays)
}

function twoMinutesAgo() {
	const now = new Date()
	const twoMinutes = 2 * 60 * 1000
	return new Date(now.getTime() - twoMinutes)
}

describe('x-live-blog-post', () => {
	describe('TimeStamp', () => {
		describe('when timestamp is older than 24 hours', () => {
			it('renders the time in MMM dd, HH:mm', () => {
				const date = twoDaysAgo()
				const timestamp = mount(<Timestamp publishedTimestamp={date.toISOString()} />)
				const dateEl = timestamp.find('time[data-o-component="o-date"]')

				expect(dateEl.prop('data-o-date-format')).toEqual('MMM dd, HH:mm')
				expect(dateEl.prop('dateTime')).toEqual(date.toISOString())
				expect(dateEl.text()).toEqual(date.toLocaleString())
			})

			it('does not render exact time', () => {
				const timestamp = mount(<Timestamp publishedTimestamp={twoDaysAgo().toISOString()} />)
				const exactTimeEl = timestamp.find('span').at(1)

				expect(exactTimeEl).not.toExist()
			})
		})

		describe('when timestamp is in the last 24 hours', () => {
			it('renders the time in "time ago" format', () => {
				const date = twoMinutesAgo()
				const timestamp = mount(<Timestamp publishedTimestamp={date.toISOString()} />)
				const dateEl = timestamp.find('time[data-o-component="o-date"]')

				expect(dateEl.prop('data-o-date-format')).toEqual('time-ago-no-seconds')
				expect(dateEl.prop('dateTime')).toEqual(date.toISOString())
				expect(dateEl.text()).toEqual(date.toLocaleString())
			})

			it('renders the exact time', () => {
				const timestamp = mount(<Timestamp publishedTimestamp={twoMinutesAgo().toISOString()} />)
				const exactTimeEl = timestamp.find('span').at(1)

				expect(exactTimeEl.prop('data-o-date-format')).toEqual('HH:mm')
			})
		})
	})
})
