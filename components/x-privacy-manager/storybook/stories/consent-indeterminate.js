import { StoryContainer } from '../story-container'
import { defaultArgs, defaultArgTypes, getFetchMock } from '../data'

/**
 * @param {import('../../typings/x-privacy-manager').PrivacyManagerProps} args
 */
export const ConsentIndeterminate = (args) => {
	getFetchMock(200)
	return StoryContainer(args)
}

ConsentIndeterminate.storyName = 'Consent: indeterminate'
ConsentIndeterminate.args = {
	...defaultArgs,
	consent: undefined
}
ConsentIndeterminate.argTypes = defaultArgTypes
