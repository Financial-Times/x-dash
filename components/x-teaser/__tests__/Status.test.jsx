const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import * as LiveBlogStatus from '../src/LiveBlogStatus'
import * as ExclusiveLabel from '../src/ExclusiveLabel'
import * as PremiumLabel from '../src/PremiumLabel'
import * as AlwaysShowTimestamp from '../src/AlwaysShowTimestamp'
import * as RelativeTime from '../src/RelativeTime'
import * as TimeStamp from '../src/TimeStamp'

const LiveBlogStatusSpy = jest
	.spyOn(LiveBlogStatus, 'default')
	.mockReturnValue(<div className="live-blog-status">LiveBlogStatus</div>)
const ExclusiveLabelSpy = jest
	.spyOn(ExclusiveLabel, 'default')
	.mockReturnValue(<div className="exclusive-label">ExclusiveLabel</div>)
const PremiumLabelSpy = jest
	.spyOn(PremiumLabel, 'default')
	.mockReturnValue(<div className="premium-label">PremiumLabel</div>)
// don't mock this component as we want to test its logic
const AlwaysShowTimestampSpy = jest.spyOn(AlwaysShowTimestamp, 'default')
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
			showExclusiveLabel: true,
			status: 'inprogress',
			indicators: { isExclusive: true, accessLevel: 'premium' },
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
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
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

	describe('ExclusiveLabel', () => {
		beforeEach(() => {
			delete props.status
		})

		it('renders only ExclusiveLabel when higher-level render props are absent and ExclusiveLabel props are present', () => {
			mount(<Status {...props} />)

			expect(ExclusiveLabelSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should not render ExclusiveLabel when showExclusiveLabel = false', () => {
			props.showExclusiveLabel = false
			mount(<Status {...props} />)

			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
		})

		it('should not render ExclusiveLabel when props.indicators.isExclusive = false', () => {
			props.indicators.isExclusive = false
			mount(<Status {...props} />)

			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
		})
	})

	describe('PremiumLabel', () => {
		beforeEach(() => {
			delete props.status
			props.showExclusiveLabel = false
		})

		it('renders only PremiumLabel when higher-level render props are absent and PremiumLabel props are present', () => {
			mount(<Status {...props} />)

			expect(PremiumLabelSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
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
			props.showExclusiveLabel = false
			props.showPremiumLabel = false
		})

		it('renders only AlwaysShowTimestamp when higher-level render props are absent and AlwaysShowTimestamp props are present', () => {
			AlwaysShowTimestampSpy.mockReturnValueOnce(
				<div className="always-show-timestamp">AlwaysShowTimestamp</div>
			)
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
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

		it('should select RelativeTime when publishedDate is same as today in AlwaysShowTimestamp', () => {
			props.publishedDate = new Date().toISOString()
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).toHaveBeenCalledTimes(1)
			expect(RelativeTimeSpy).toHaveBeenCalledTimes(1)
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})

		it('should select TimeStamp when publishedDate is not the same as today in AlwaysShowTimestamp', () => {
			const yesterday = new Date()
			// yes this works on the first of the month too
			yesterday.setDate(yesterday.getDate() - 1)
			props.publishedDate = yesterday.toISOString()
			mount(<Status {...props} />)

			expect(AlwaysShowTimestampSpy).toHaveBeenCalledTimes(1)
			expect(TimeStampSpy).toHaveBeenCalledTimes(1)
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
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
			props.showExclusiveLabel = false
			props.showPremiumLabel = false
			props.useRelativeTimeIfToday = false
		})

		it('renders only RelativeTime when higher-level render props are absent and RelativeTime props are present', () => {
			mount(<Status {...props} />)

			expect(RelativeTimeSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
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
			props.showExclusiveLabel = false
			props.showPremiumLabel = false
			props.useRelativeTimeIfToday = false
			props.useRelativeTime = false
		})

		it('renders only TimeStamp when higher-level render props are absent and TimeStamp props are present', () => {
			mount(<Status {...props} />)

			expect(TimeStampSpy).toHaveBeenCalledTimes(1)
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
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
				showExclusiveLabel: false,
				status: 'inprogress',
				indicators: { isExclusive: true, accessLevel: 'premium' },
				firstPublishedDate: '2025-10-01T00:00:00.000Z',
				publishedDate: '2025-10-01T00:00:00.000Z',
				useRelativeTimeIfToday: true,
				useRelativeTime: true
			}
			const subject = mount(<Status {...props} />)

			expect(subject.isEmptyRender()).toBeTruthy()
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
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
				showExclusiveLabel: false,
				indicators: { isExclusive: true, accessLevel: 'premium' },
				firstPublishedDate: '2025-10-01T00:00:00.000Z',
				useRelativeTimeIfToday: true,
				useRelativeTime: true
			}
			const subject = mount(<Status {...props} />)

			expect(subject.isEmptyRender()).toBeTruthy()
			expect(LiveBlogStatusSpy).not.toHaveBeenCalled()
			expect(ExclusiveLabelSpy).not.toHaveBeenCalled()
			expect(PremiumLabelSpy).not.toHaveBeenCalled()
			expect(AlwaysShowTimestampSpy).not.toHaveBeenCalled()
			expect(RelativeTimeSpy).not.toHaveBeenCalled()
			expect(TimeStampSpy).not.toHaveBeenCalled()
		})
	})
})
