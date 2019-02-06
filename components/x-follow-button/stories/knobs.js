// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { text, boolean, select }) => {
	return {
		conceptNameAsButtonText () {
			return boolean('conceptNameAsButtonText', data.conceptNameAsButtonText);
		},
		isFollowed () {
			return boolean('isFollowed', data.isFollowed);
		},
		conceptName () {
			return text('Topic name', data.conceptName);
		},
		followPlusDigestEmail () {
			return boolean('followPlusDigestEmail', data.followPlusDigestEmail);
		},
		variant () {
			return select('variant', [ 'standard', 'inverse', 'opinion', 'monochrome' ], data.variant);
		}
	};
};
