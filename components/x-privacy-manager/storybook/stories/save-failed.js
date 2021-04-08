import { StoryContainer } from '../story-container'
import { defaultArgs, defaultArgTypes, getFetchMock } from '../data'

/**
 * @param {XPrivacyManager.PrivacyManagerProps} args
 */
export const SaveFailed = (args) => {
	getFetchMock(500)
	return StoryContainer(args)
}

SaveFailed.storyName = 'Save failed'
SaveFailed.args = defaultArgs
SaveFailed.argTypes = defaultArgTypes
