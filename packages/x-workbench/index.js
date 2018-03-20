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

let loaded = false;

//TODO: collect stories from all the components
function loadStories() {
	if(!loaded) {
		require('./dist/x-teaser');
	}

	loaded = true;
};

function getComponents() {
	loadStories();
	return getStorybook();
}

module.exports = getComponents;

module.exports.getStoryComponent = (kind, name) => {
	return getComponents()
		.find(c => c.kind === kind)
		.find(s => s.name === name)
		.render;
};
