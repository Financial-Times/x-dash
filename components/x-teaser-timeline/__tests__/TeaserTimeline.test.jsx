const renderer = require('react-test-renderer');
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const contentItems = require('../stories/content-items.json');

const { TeaserTimeline } = require('../');

describe('x-teaser-timeline', () => {
	let props;
	let tree;

	beforeEach(() => {
		props = {
			items: contentItems,
			timezoneOffset: -60,
			localTodayDate: '2018-10-17'
		};
	});

	describe('given latestItemsTime is set', () => {
		beforeEach(() => {
			tree = renderer.create(<TeaserTimeline
				{...props}
				latestItemsTime='2018-10-17T12:10:33.000Z'
			/>).toJSON();
		});

		it('renders latest, earlier, yesterday and October 15th item groups', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('given latestItemsTime is not set', () => {
		beforeEach(() => {
			tree = renderer.create(<TeaserTimeline {...props} />).toJSON();
		});

		it('renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('given latestItemsTime is set but is not same date as localTodayDate', () => {
		beforeEach(() => {
			tree = renderer.create(<TeaserTimeline
				{...props}
				latestItemsTime='2018-10-16T12:10:33.000Z'
			/>).toJSON();
		});

		it('ignores latestItemsTime and renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('showSaveButtons', () => {
		describe('given showSaveButtons is not set or is true', () => {
			beforeEach(() => {
				tree = renderer.create(<TeaserTimeline {...props} />).toJSON();
			});

			it('renders save buttons by default', () => {
				expect(tree).toMatchSnapshot();
			});
		});

		describe('given showSaveButtons is set to false', () => {
			beforeEach(() => {
				tree = renderer.create(<TeaserTimeline {...props} showSaveButtons={false} />).toJSON();
			});

			it('does not render the save buttons', () => {
				expect(tree).toMatchSnapshot();
			});
		});
	});

	describe('given no item are provided', () => {
		let component;

		beforeEach(() => {
			delete props.items;
			component = mount(<TeaserTimeline {...props} />);
		});

		it('should render nothing', () => {
			expect(component.html()).toEqual(null);
		})
	});
});
