// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { object, text, number, boolean, date, selectV2 }) => {
	const Groups = {
        Button: 'Button',
        Flags: 'Flags',
        Variant: 'Variant'
	};

    const Button = {
        buttonText() {
            return text('Default text', data.buttonText, Groups.Button);
        },
        alternateText() {
            return text('Alternate text', data.alternateText, Groups.Button);
		}
    }

	const Flags = {
		switchFollowDigestEmail() {
            return boolean('followDigestEmail', data.switchFollowDigestEmail, Groups.Flags)
		},
		cacheablePersonalisedUrl() {
			return boolean('cacheablePersonalisedUrl', data.cacheablePersonalisedUrl, Groups.Flags)
		},
        followPlusDigestEmail() {
			return boolean('followPlusDigestEmail', data.followPlusDigestEmail, Groups.Flags)
		},
        isSelected() {
			return boolean('isSelected', data.isSelected, Groups.Flags)
		}
	}

	const Variant = {
		variant() {
            return text('Variant', data.variant, Groups.Variant);
		}
	}

	return Object.assign({}, Button, Flags, Variant);
};
