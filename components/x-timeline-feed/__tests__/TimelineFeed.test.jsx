const renderer = require('react-test-renderer');
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const contentItems = require('../stories/content-items.json');

const { TimelineFeed } = require('../');

describe('x-timeline-feed', () => {
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
			tree = renderer.create(<TimelineFeed
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
			tree = renderer.create(<TimelineFeed {...props} />).toJSON();
		});

		it('renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('given latestItemsTime is set but is not same date as localTodayDate', () => {
		beforeEach(() => {
			tree = renderer.create(<TimelineFeed
				{...props}
				latestItemsTime='2018-10-16T12:10:33.000Z'
			/>).toJSON();
		});

		it('ignores latestItemsTime and renders earlier, yesterday and October 15th item groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('itemCustomSlot', () => {
		let mockItemActionsCreator;

		describe('given itemCustomSlot is a function', () => {
			beforeEach(() => {
				mockItemActionsCreator = jest.fn(item => `action for ${item.id}`);
				tree = renderer.create(<TimelineFeed
					{...props}
					itemCustomSlot={mockItemActionsCreator}
				/>).toJSON();
			});

			it('should call the itemCustomSlot for each item, with each item', () => {
				mockItemActionsCreator.mock.calls.forEach((c, i) => {
					expect(c[0]).toEqual(expect.objectContaining(contentItems[i]));
				});
			});

			it('renders each item with the created item-specific action', () => {
				expect(tree).toMatchSnapshot();
			});
		});
		describe('given itemCustomSlot is a JSX child', () => {
			beforeEach(() => {
				mockItemActionsCreator = <b>I am an action</b>;
				tree = renderer.create(<TimelineFeed
					{...props}
					itemCustomSlot={mockItemActionsCreator}
				/>).toJSON();
			});

			it('renders each item with the action', () => {
				expect(tree).toMatchSnapshot();
			});
		});

		describe('given itemCustomSlot is not set', () => {
			beforeEach(() => {
				tree = renderer.create(<TimelineFeed {...props} />).toJSON();
			});

			it('renders each item without an action', () => {
				expect(tree).toMatchSnapshot();
			});
		});
	});

	describe('given no item are provided', () => {
		let component;

		beforeEach(() => {
			delete props.items;
			component = mount(<TimelineFeed {...props} />);
		});

		it('should render nothing', () => {
			expect(component.html()).toEqual(null);
		})
	});
});
