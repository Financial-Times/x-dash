const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import * as LiveBlogStatus from '../src/LiveBlogStatus'
import * as ScoopLabel from '../src/ScoopLabel'
import * as PremiumLabel from '../src/PremiumLabel'
import * as AlwaysShowTimestamp from '../src/AlwaysShowTimestamp'
import * as RelativeTime from '../src/RelativeTime'
import * as TimeStamp from '../src/TimeStamp'

const LiveBlogStatusSpy = jest
	.spyOn(LiveBlogStatus, 'default')
	.mockReturnValue(<div className="live-blog-status">LiveBlogStatus</div>)
const ScoopLabelSpy = jest
	.spyOn(ScoopLabel, 'default')
	.mockReturnValue(<div className="scoop-label">ScoopLabel</div>)
const PremiumLabelSpy = jest
	.spyOn(PremiumLabel, 'default')
	.mockReturnValue(<div className="premium-label">PremiumLabel</div>)
const AlwaysShowTimestampSpy = jest
	.spyOn(AlwaysShowTimestamp, 'default')
	.mockReturnValue(<div className="always-show-timestamp">AlwaysShowTimestamp</div>)
const RelativeTimeSpy = jest
	.spyOn(RelativeTime, 'default')
	.mockReturnValue(<div className="relative-time">RelativeTimeSpy</div>)
const TimeStampSpy = jest
	.spyOn(TimeStamp, 'default')
	.mockReturnValue(<div className="timestamp">TimeStamp</div>)

import Status from '../src/Status'

describe('Status - Display Logic', () => {
	let props

	beforeEach(() => {
		props = {
			showStatus: true,
			showPremiumLabel: true,
			showScoopLabel: true,
			status: 'inprogress',
			indicators: { isScoop: true, accessLevel: 'premium' },
			firstPublishedDate: '2025-10-01T00:00:00.000Z',
			publishedDate: '2025-10-01T00:00:00.000Z',
			useRelativeTimeIfToday: true,
			useRelativeTime: true
		}
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('LiveBlogStatus', () => {
		it('renders only LiveBlogStatus when LiveBlogStatus props are present', () => {
			mount(<Status {...props} />)

			expect(LiveBlogStatusSpy).toHaveBeenCalledTimes(1)
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render LiveBlogStatus when status is not present', () => {
			delete props.status
			mount(<Status {...props} />)

			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
		})

		it('should not render LiveBlogStatus when showStatus is false', () => {
			props.showStatus = false
			mount(<Status {...props} />)

			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
		})
	})

	describe('ScoopLabel', () => {
		beforeEach(() => {
			delete props.status
		})

		it('renders only ScoopLabel when higher-level render props are absent and ScoopLabel props are present', () => {
			mount(<Status {...props} />)

			expect(ScoopLabelSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render ScoopLabel when showScoopLabel = false', () => {
			props.showScoopLabel = false
			mount(<Status {...props} />)

			expect(ScoopLabelSpy).not.toHaveBeenCalled()
		})

		it('should not render ScoopLabel when props.indicators.isScoop = false', () => {
			props.indicators.isScoop = false
			mount(<Status {...props} />)

			expect(ScoopLabelSpy).not.toHaveBeenCalled()
		})

		it('should not render ScoopLabel when firstPublishedDate is older than the cutoff date', () => {
			props.firstPublishedDate = '2025-09-01T00:00:00.000Z'
			mount(<Status {...props} />)

			expect(ScoopLabelSpy).not.toHaveBeenCalled()
		})
	})

	describe('PremiumLabel', () => {
		beforeEach(() => {
			delete props.status
			props.showScoopLabel = false
		})

		it('renders only PremiumLabel when higher-level render props are absent and PremiumLabel props are present', () => {
			mount(<Status {...props} />)

			expect(PremiumLabelSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render PremiumLabel when showPremiumLabel = false', () => {
			props.showPremiumLabel = false
			mount(<Status {...props} />)

			expect(PremiumLabelSpy).not.toHaveBeenCalled()
		})

		it('should not render PremiumLabel when accessLevel is not premium', () => {
			props.indicators.accessLevel = 'subscribed'
			mount(<Status {...props} />)

			expect(PremiumLabelSpy).not.toHaveBeenCalled()
		})
	})

	describe('AlwaysShowTimestamp', () => {
		beforeEach(() => {
			delete props.status
			props.showScoopLabel = false
			props.showPremiumLabel = false
		})

		it('renders only AlwaysShowTimestamp when higher-level render props are absent and AlwaysShowTimestamp props are present', () => {
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render AlwaysShowTimestamp when showStatus = false', () => {
			props.showStatus = false
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
		})

		it('should not render AlwaysShowTimestamp when publishedDate is not present', () => {
			delete props.publishedDate
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
		})

		it('should not render AlwaysShowTimestamp when useRelativeTimeIfToday = false', () => {
			props.useRelativeTimeIfToday = false
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
		})
	})

	describe('RelativeTime', () => {
		beforeEach(() => {
			delete props.status
			props.showScoopLabel = false
			props.showPremiumLabel = false
			props.useRelativeTimeIfToday = false
		})

		it('renders only RelativeTime when higher-level render props are absent and RelativeTime props are present', () => {
			mount(<Status {...props} />)

			expect(RelativeTimeSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render RelativeTime when showStatus = false', () => {
			props.showStatus = false
			mount(<Status {...props} />)

			expect(RelativeTimeSpy).not.toHaveBeenCalled()
		})

		it('should not render RelativeTime when publishedDate is not present', () => {
			delete props.publishedDate
			mount(<Status {...props} />)

			expect(RelativeTimeSpy).not.toHaveBeenCalled()
		})

		it('should not render RelativeTime when useRelativeTime = false', () => {
			props.useRelativeTime = false
			mount(<Status {...props} />)

			expect(RelativeTimeSpy).not.toHaveBeenCalled()
		})
	})

	describe('TimeStamp', () => {
		beforeEach(() => {
			delete props.status
			props.showScoopLabel = false
			props.showPremiumLabel = false
			props.useRelativeTimeIfToday = false
			props.useRelativeTime = false
		})

		it('renders only TimeStamp when higher-level render props are absent and TimeStamp props are present', () => {
			mount(<Status {...props} />)

			expect(TimeStampSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
		})

		it('should not render TimeStamp when showStatus = false', () => {
			props.showStatus = false
			mount(<Status {...props} />)

			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render TimeStamp when publishedDate is not present', () => {
			delete props.publishedDate
			mount(<Status {...props} />)

			expect(TimeStampSpy).not.toHaveBeenCalled()
		})
	})

	describe('No Status rendered', () => {
		it('should not render any Status - Case 1: all showXXX properties are set to false', () => {
			props = {
				showStatus: false,
				showPremiumLabel: false,
				showScoopLabel: false,
				status: 'inprogress',
				indicators: { isScoop: true, accessLevel: 'premium' },
				firstPublishedDate: '2025-10-01T00:00:00.000Z',
				publishedDate: '2025-10-01T00:00:00.000Z',
				useRelativeTimeIfToday: true,
				useRelativeTime: true
			}
			const subject = mount(<Status {...props} />)

			expect(subject.isEmptyRender()).toBeTruthy()
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render any Status - Case 2: showStatus = true but other properties are not present', () => {
			// status & publishedDate are missing
			props = {
				showStatus: true,
				showPremiumLabel: false,
				showScoopLabel: false,
				indicators: { isScoop: true, accessLevel: 'premium' },
				firstPublishedDate: '2025-10-01T00:00:00.000Z',
				useRelativeTimeIfToday: true,
				useRelativeTime: true
			}
			const subject = mount(<Status {...props} />)

			expect(subject.isEmptyRender()).toBeTruthy()
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ScoopLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})
	})
})
