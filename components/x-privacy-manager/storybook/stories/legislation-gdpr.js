import { StoryContainer } from '../story-container'
import { defaultArgs, defaultArgTypes, getFetchMock } from '../data'

const args = {
	...defaultArgs,
	legislationId: 'gdpr',
	consent: undefined,
	buttonText: {
		allow: {
			label: 'Allow',
			text: 'See personalised advertising and allow measurement of advertising effectiveness'
		},
		block: {
			label: 'Block',
			text: 'Block personalised advertising and measurement of advertising effectiveness'
		}
	}
}

export const LegislationGDPR = (args) => {
	getFetchMock(200)
	return StoryContainer(args)
}

LegislationGDPR.storyName = 'Legislation: GDPR'
LegislationGDPR.args = args
LegislationGDPR.argTypes = defaultArgTypes
