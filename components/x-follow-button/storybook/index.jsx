import React from 'react'
import { FollowButton } from '../src/FollowButton'
import BuildService from '../../../.storybook/build-service'

import '../src/styles/main.scss'

const dependencies = {
	'o-fonts': '^5.3.0'
}

export default {
	title: 'x-follow-button'
}

export const _FollowButton = (args) => (
	<div className="story-container">
		<BuildService dependencies={dependencies} />
		<FollowButton {...args} />
	</div>
)

_FollowButton.args = {
	conceptNameAsButtonText: false,
	isFollowed: false,
	conceptName: 'UK politics & policy',
	followPlusDigestEmail: true,
	variant: 'standard'
}
_FollowButton.argTypes = {
	variant: { control: { type: 'select', options: ['standard', 'inverse', 'opinion', 'monochrome'] } }
}
