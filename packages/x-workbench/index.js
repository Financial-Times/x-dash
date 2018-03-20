const {getStorybook} = require('@storybook/react');
const {default: addons} = require('@storybook/addons');

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

//TODO: collect stories from all the components
function loadStories() {
	require('./dist/x-teaser');
};

module.exports = () => {
	loadStories();
	return getStorybook();
};
