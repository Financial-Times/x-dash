// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { object, text, number, boolean, date, selectV2 }) => {
	const Groups = {
		Text: 'Text',
		Status: 'Status',
		Flags: 'Flags',		
		ExtraClasses: 'ExtraClasses'
	};

    const Text = {
        buttonText () {
            return text('Default text', data.buttonText, Groups.Text);
        },
        alternateText () {
            return text('Alternate text', data.alternateText, Groups.Text);
		},
        name () {
            return text('Name of what we add', data.name, Groups.Text);
		}
	}

	const Status = {
		isSelected () {
			return boolean('isSelected', data.isSelected, Groups.Status);
		}
	}

	const Flags = {
		followPlusDigestEmail () {
			return boolean('followPlusDigestEmail', data.followPlusDigestEmail, Groups.Flags);
		}
	}

	const ExtraClasses = {
		extraButtonClasses () {
			return text('extraButtonClasses', data.extraButtonClasses, Groups.ExtraClasses);
		},
		variant () {
            return selectV2('variant', [ null, 'two', 'three', 'four' ], data.variant, Groups.ExtraClasses);
		}
	}

	return Object.assign({}, Text, Status, Flags, ExtraClasses);
};
