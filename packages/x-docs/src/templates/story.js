const React = require('react');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');
const pick = require('lodash.pick')

const stories = loadStories();

module.exports = ({pathContext: {componentName, componentBook, sitemap: {title}}}) => {
	console.log({
		componentName,
		componentBook
	})
	const story = stories[componentName][componentBook];
	return story.stories[title]({
		createProps: allowedProps => pick(story.fixture, allowedProps),
	});
};
