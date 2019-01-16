// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { text, boolean, select }) => {
	const Groups = {
		Text: 'Text',
		Status: 'Status',
		Flags: 'Flags',
		Variant: 'Variant'
	};

	const Text = {
		conceptNameAsButtonText () {
			return boolean('conceptNameAsButtonText', data.conceptNameAsButtonText, Groups.Flags);
		},
		conceptName () {
			return text('Topic name', data.conceptName, Groups.Text);
		}
	};

	const Status = {
		isFollowed () {
			return boolean('isFollowed', data.isFollowed, Groups.Status);
		}
	};

	const Flags = {
		followPlusDigestEmail () {
			return boolean('followPlusDigestEmail', data.followPlusDigestEmail, Groups.Flags);
		}
	};

	const Variant = {
		variant () {
			return select('variant', [ 'standard', 'inverse', 'opinion', 'monochrome' ], data.variant, Groups.Variant);
		}
	};

	return Object.assign({}, Text, Status, Flags, Variant);
};
