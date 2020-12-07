import { StoryContainer } from '../story-container'
import { defaultArgs, defaultArgTypes, getFetchMock } from '../data'

export const ConsentBlocked = (args) => {
	getFetchMock(200)
	return StoryContainer(args)
}

ConsentBlocked.storyName = 'Consent: blocked'
ConsentBlocked.args = {
	...defaultArgs,
	consent: false
}
ConsentBlocked.argTypes = defaultArgTypes
