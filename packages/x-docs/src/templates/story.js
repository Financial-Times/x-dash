const React = require('react');
const {getStoryComponent} = require('@financial-times/x-workbench');

module.exports = ({pathContext}) => {
	return getStoryComponent(pathContext);
};
