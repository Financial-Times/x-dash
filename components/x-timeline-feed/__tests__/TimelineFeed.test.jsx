const renderer = require('react-test-renderer');
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const articles = require('../stories/articles.json');

const { TimelineFeed } = require('../');

describe('x-timeline-feed', () => {
	let props;
	let tree;

	beforeEach(() => {
		props = {
			articles: articles,
			timezoneOffset: -60,
			localTodayDate: '2018-10-17'
		};
	});

	describe('given latestArticlesTime is set', () => {
		beforeEach(() => {
			tree = renderer.create(<TimelineFeed
				{...props}
				latestArticlesTime='2018-10-17T12:10:33.000Z'
			/>).toJSON();
		});

		it('renders latest, earlier, yesterday and October 15th article groups', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('given latestArticlesTime is not set', () => {
		beforeEach(() => {
			tree = renderer.create(<TimelineFeed {...props} />).toJSON();
		});

		it('renders earlier, yesterday and October 15th article groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('given latestArticlesTime is set but is not same date as localTodayDate', () => {
		beforeEach(() => {
			tree = renderer.create(<TimelineFeed
				{...props}
				latestArticlesTime='2018-10-16T12:10:33.000Z'
			/>).toJSON();
		});

		it('ignores latestArticlesTime and renders earlier, yesterday and October 15th article groups (no latest)', () => {
			expect(tree).toMatchSnapshot();
		});
	});

	describe('articleActionsCreator', () => {
		describe('given articleActionsCreator is set', () => {
			let mockArticleActionsCreator;
			beforeEach(() => {
				mockArticleActionsCreator = jest.fn(article => `action for ${article.id}`);
				tree = renderer.create(<TimelineFeed
					{...props}
					articleActionsCreator={mockArticleActionsCreator}
				/>).toJSON();
			});

			it('should call the articleActionsCreator for each article, with each article', () => {
				mockArticleActionsCreator.mock.calls.forEach((c, i) => {
					expect(c[0]).toEqual(expect.objectContaining(articles[i]));
				});
			});

			it('renders each article with the created article-specific action', () => {
				expect(tree).toMatchSnapshot();
			});
		});

		describe('given articleActionsCreator is not set', () => {
			beforeEach(() => {
				tree = renderer.create(<TimelineFeed {...props} />).toJSON();
			});

			it('renders each article without an action', () => {
				expect(tree).toMatchSnapshot();
			});
		});
	});

	describe('given no articles are provided', () => {
		let component;

		beforeEach(() => {
			delete props.articles;
			component = mount(<TimelineFeed {...props} />);
		});

		it('should render nothing', () => {
			expect(component.html()).toEqual(null);
		})
	});
});
