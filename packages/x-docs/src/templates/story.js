const React = require('react');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');
const pick = require('lodash.pick')

const stories = loadStories();

module.exports = ({pathContext: {storyCategory, sitemap: {title}}}) => {
	const story = stories[storyCategory];
	return story.stories[title]({
		createProps: allowedProps => pick(story.fixture, allowedProps),
	});
};
