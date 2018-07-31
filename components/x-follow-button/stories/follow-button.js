exports.title = 'Follow Button';

const data = {
	id: '',
	buttonText: 'Add to myFT',
	alternateText: 'Added',
	variant: null,
	switchFollowDigestEmail: false,
	followPlusDigestEmail: true,
	isSelected: false,
	csrfToken: 'testTokenValue',
	conceptId: '00000-0000-00000-00000',
	name: 'Test Name'
};

// This data will provide defaults for the Knobs defined below and used
// to render examples in the documentation site.
exports.data = data;

// A list of properties to pass to the component when rendered in Storybook. If a Knob
// exists for the property then it will be editable with the default as defined above.
exports.knobs = Object.keys(data);

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module;
