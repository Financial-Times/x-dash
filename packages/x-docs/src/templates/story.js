const React = require('react');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');

const stories = loadStories();

module.exports = ({pathContext: {storyCategory, sitemap: {title}}}) => {
	const story = stories[storyCategory];
	return story.stories[title]({
		createProps: () => Object.assign({}, story.fixture)
	});
};
