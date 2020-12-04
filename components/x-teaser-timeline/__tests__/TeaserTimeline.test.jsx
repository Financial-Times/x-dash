const renderer = require('react-test-renderer')
const { h } = require('@financial-times/x-engine')
const { shallow } = require('@financial-times/x-test-utils/enzyme')
const contentItems = require('../storybook/content-items.json')

const { TeaserTimeline } = require('../')

describe('x-teaser-timeline', () => {
	let props
	let tree

	beforeEach(() => {
		props = {
			items: contentItems,
			timezoneOffset: -60,
			localTodayDate: '2018-10-17'
		}
	})

	describe('given latestItemsTime is set', () => {
		beforeEach(() => {
			tree = renderer
				.create(<TeaserTimeline {...props} latestItemsTime="2018-10-17T12:10:33.000Z" />)
				.toJSON()
		})

		it('renders latest, earlier, yesterday and October 15th item groups', () => {
			expect(tree).toMatchSnapshot()
		})
	})

	describe('given latestItemsTime is set and results in all today`s articles being "latest"', () => {
		let component

		beforeEach(() => {
			component = shallow(
				<TeaserTimeline {...props} timezoneOffset={0} latestItemsTime="2018-10-17T00:00:00.000Z" />
			)
		})

		it('does not render the empty "earlier today" group', () => {
			expect(component.render().find('section')).toHaveLength(3)
			expect(component.render().find('section h2').text().toLowerCase().includes('earlier today')).toBe(false)
		})
	})

	describe('given latestItemsTime is set and results in all today\'s and some of yesterday\'s articles being "latest"', () => {
		beforeEach(() => {
			tree = renderer
				.create(
					<TeaserTimeline
						{...props}
						timezoneOffset={0}
						latestItemsTime="2018-10-16T11:59:59.999Z"
						latestItemsAgeHours={36}
					/>
				)
				.toJSON()
		})

		it('renders latest, yesterday and October 15th item groups (no earlier today)', () => {
			expect(tree).toMatchSnapshot()
		})
	})

	describe('given latestItemsTime is not set', () => {
		beforeEach(() => {
			tree = renderer.create(<TeaserTimeline {...props} />).toJSON()
		})

		it('renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot()
		})
	})

	describe('given latestItemsTime is set but is more than latestItemsAgeHours ago', () => {
		beforeEach(() => {
			tree = renderer
				.create(
					<TeaserTimeline {...props} latestItemsTime="2018-10-15T11:59:59.999Z" latestItemsAgeHours={36} />
				)
				.toJSON()
		})

		it('ignores latestItemsTime and renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot()
		})
	})

	describe('given latestItemsTime is set but is not same date as localTodayDate', () => {
		beforeEach(() => {
			tree = renderer
				.create(<TeaserTimeline {...props} latestItemsTime="2018-10-16T12:10:33.000Z" />)
				.toJSON()
		})

		it('ignores latestItemsTime and renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot()
		})
	})

	describe('showSaveButtons', () => {
		describe('given showSaveButtons is not set or is true', () => {
			beforeEach(() => {
				tree = renderer.create(<TeaserTimeline {...props} />).toJSON()
			})

			it('renders save buttons by default', () => {
				expect(tree).toMatchSnapshot()
			})
		})

		describe('given showSaveButtons is set to false', () => {
			beforeEach(() => {
				tree = renderer.create(<TeaserTimeline {...props} showSaveButtons={false} />).toJSON()
			})

			it('does not render the save buttons', () => {
				expect(tree).toMatchSnapshot()
			})
		})
	})

	describe('given no item are provided', () => {
		let component

		beforeEach(() => {
			delete props.items
			component = shallow(<TeaserTimeline {...props} />)
		})

		it('should render nothing', () => {
			expect(component.html()).toEqual(null)
		})
	})

	describe('custom slot', () => {
		let component

		describe('custom slot content is a string', () => {
			describe('without latestArticlesTime set', () => {
				beforeEach(() => {
					component = shallow(
						<TeaserTimeline
							{...props}
							customSlotContent='<div class="custom-slot">Custom slot content</div>'
							customSlotPosition={3}
						/>
					)
				})

				it('has custom content in correct position', () => {
					expect(component.render().find('.custom-slot')).toHaveLength(1)
					expect(component.render().find('li').eq(3).find('.custom-slot')).toHaveLength(1)
				})
			})

			describe('with latestArticlesTime set', () => {
				beforeEach(() => {
					component = shallow(
						<TeaserTimeline
							{...props}
							customSlotContent='<div class="custom-slot">Custom slot content</div>'
							customSlotPosition={2}
							latestArticlesTime="2018-10-16T12:10:33.000Z"
						/>
					)
				})

				it('has custom content in correct position', () => {
					expect(component.render().find('.custom-slot')).toHaveLength(1)
					expect(component.render().find('li').eq(2).find('.custom-slot')).toHaveLength(1)
				})
			})
		})

		describe('custom slot content is a node', () => {
			beforeEach(() => {
				component = shallow(
					<TeaserTimeline
						{...props}
						customSlotContent={<div className="custom-slot">Custom slot content</div>}
						customSlotPosition={3}
					/>
				)
			})

			it('has custom content in correct position', () => {
				expect(component.render().find('.custom-slot')).toHaveLength(1)
				expect(component.render().find('li').eq(3).find('.custom-slot')).toHaveLength(1)
			})
		})
	})
})
