const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import RelativeTime from '../src/RelativeTime'

jest.mock('../src/concerns/date-time', () => ({
	isRecent: jest.fn(),
	getRelativeDate: jest.fn(),
	getStatus: jest.fn()
}))

import { isRecent, getRelativeDate, getStatus } from '../src/concerns/date-time'

describe('RelativeTime - Timestamp and Status Label Logic', () => {
	const samplePublishedDate = '2021-10-15T12:00:00.000Z'

	beforeEach(() => {
		jest.clearAllMocks()
		getRelativeDate.mockReturnValue('1 hour ago')
		isRecent.mockReturnValue(true)
	})

	describe('NEW status', () => {
		beforeEach(() => {
			getStatus.mockReturnValue('new')
		})

		it('displays only the NEW label without timestamp element', () => {
			const subject = mount(
				<RelativeTime publishedDate={samplePublishedDate} firstPublishedDate={samplePublishedDate} />
			)
			expect(subject.find('.o-teaser__timestamp-prefix')).toHaveLength(1)
			expect(subject.find('.o-teaser__timestamp-prefix').text()).toContain('new')
			expect(subject.find('time')).toHaveLength(0)
		})
	})

	describe('UPDATED status', () => {
		beforeEach(() => {
			getStatus.mockReturnValue('updated')
		})

		it('displays only the UPDATED label without timestamp element', () => {
			const subject = mount(
				<RelativeTime publishedDate={samplePublishedDate} firstPublishedDate={samplePublishedDate} />
			)
			expect(subject.find('.o-teaser__timestamp-prefix')).toHaveLength(1)
			expect(subject.find('.o-teaser__timestamp-prefix').text()).toContain('updated')
			expect(subject.find('time')).toHaveLength(0)
		})
	})

	describe('no status (older content)', () => {
		beforeEach(() => {
			getStatus.mockReturnValue('')
		})

		it('displays only the timestamp without status label', () => {
			const subject = mount(
				<RelativeTime publishedDate={samplePublishedDate} firstPublishedDate={samplePublishedDate} />
			)
			expect(subject.find('.o-teaser__timestamp-prefix')).toHaveLength(0)
			expect(subject.find('time')).toHaveLength(1)
			expect(subject.find('.o-teaser__timestamp-date')).toHaveLength(1)
		})
	})
})
