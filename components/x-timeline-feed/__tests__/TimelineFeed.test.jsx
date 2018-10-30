const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const articles = require('../stories/articles.json');

const { TimelineFeed } = require('../');

describe('x-timeline-feed', () => {
	let component;
	let props;

	beforeEach(() => {
		props = {
			articles: articles,
			timezoneOffset: -60,
			localTodayDate: '2018-10-17'
		};
	});

	describe('given latestArticlesTime is set', () => {
		beforeEach(() => {
			component = mount(<TimelineFeed
				{...props}
				latestArticlesTime='2018-10-17T12:10:33.000Z'
			/>);
		});

		it('should have correct number of article groups', () => {
			expect(component.find('section')).toHaveLength(4);
		});

		it('should have correct article group headings and number of articles', () => {
			const sections = component.find('section');

			expect(sections.at(0).find('h2').text()).toEqual('Latest News');
			expect(sections.at(0).find('.o-teaser')).toHaveLength(2);
			expect(sections.at(1).find('h2').text()).toEqual('Earlier Today');
			expect(sections.at(1).find('.o-teaser')).toHaveLength(4);
			expect(sections.at(2).find('h2').text()).toEqual('Yesterday');
			expect(sections.at(2).find('.o-teaser')).toHaveLength(10);
			expect(sections.at(3).find('h2').text()).toEqual('October 15, 2018');
			expect(sections.at(3).find('.o-teaser')).toHaveLength(11);
		});
	});

	describe('given latestArticlesTime is not set', () => {
		beforeEach(() => {
			component = mount(<TimelineFeed {...props} />);
		});

		it('should have correct number of article groups', () => {
			expect(component.find('section')).toHaveLength(3);
		});

		it('should have correct article group headings and number of articles', () => {
			const sections = component.find('section');

			expect(sections.at(0).find('h2').text()).toEqual('Earlier Today');
			expect(sections.at(0).find('.o-teaser')).toHaveLength(6);
			expect(sections.at(1).find('h2').text()).toEqual('Yesterday');
			expect(sections.at(1).find('.o-teaser')).toHaveLength(10);
			expect(sections.at(2).find('h2').text()).toEqual('October 15, 2018');
			expect(sections.at(2).find('.o-teaser')).toHaveLength(11);
		});
	});

	describe('articleActionsCreator', () => {
		describe('given articleActionsCreator is set', () => {
			let mockArticleActionsCreator;
			beforeEach(() => {
				mockArticleActionsCreator = jest.fn(article => `action for ${article.id}`);
				component = mount(<TimelineFeed
					{...props}
					articleActionsCreator={mockArticleActionsCreator}
				/>);
			});

			it('should call the articleActionsCreator for each article, with each article', () => {
				mockArticleActionsCreator.mock.calls.forEach((c, i) => {
					expect(c[0]).toEqual(expect.objectContaining(articles[i]));
				});
			});

			it('should render the created actions inside article actions container', () => {
				const actionContainers = component.find('section ul li > div:not(.o-teaser)');

				actionContainers.forEach((container, index) => {
					expect(container.text()).toEqual(`action for ${articles[index].id}`)
				});
			});
		});

		describe('given articleActionsCreator is not set', () => {
			beforeEach(() => {
				component = mount(<TimelineFeed {...props} />);
			});

			it('should not render article actions containers', () => {
				expect(component.find('section ul li > div:not(.o-teaser)')).not.toExist();
			});
		});
	});

	describe('given no articles are provided', () => {
		beforeEach(() => {
			delete props.articles;
			component = mount(<TimelineFeed {...props} />);
		});

		it('should render nothing', () => {
			expect(component.html()).toEqual(null);
		})
	});
});
