const React = require('react');
const loadStories = require('@financial-times/x-workbench/.storybook/load-stories');

const stories = loadStories();

module.exports = ({pathContext}) => {
	return <pre>{JSON.stringify(pathContext, null, 2)}</pre>;
};
