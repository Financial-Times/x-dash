module.exports = () => [
	require('@financial-times/x-teaser/stories'),
].map(stories => [].concat(stories).map(buildStory));
