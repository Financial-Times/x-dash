import { StoryContainer } from '../story-container'
import { defaultArgs, defaultArgTypes, getFetchMock } from '../data'

export const LegislationCCPA = (args) => {
	getFetchMock(200)
	return StoryContainer(args)
}

LegislationCCPA.storyName = 'Legislation: CCPA'
LegislationCCPA.args = defaultArgs
LegislationCCPA.argTypes = defaultArgTypes
