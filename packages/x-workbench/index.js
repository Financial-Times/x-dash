const {getStorybook} = require('@storybook/react');
const {default: addons} = require('@storybook/addons');
const {loadStories} = require('./.storybook/config');

addons.setChannel({
	addListener(type, listener) {},
	addPeerListener(type, listener) {},
	emit(type, ...args) {},
	eventNames() {},
	listenerCount(type) {},
	listeners(type) {},
	on(type, listener) {},
	once(type, listener) {},
	prependListener(type, listener) {},
	prependOnceListener(type, listener) {},
	removeAllListeners(type) {},
	removeListener(type, listener) {},
});

function getComponents() {
	loadStories();
	return getStorybook();
}

module.exports = getComponents;

module.exports.getStoryComponent = ({kind, name}) => {
	return getComponents()
		.find(c => c.kind === kind).stories
		.find(s => s.name === name)
		.render();
};
