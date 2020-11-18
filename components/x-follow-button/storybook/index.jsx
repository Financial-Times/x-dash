import React from 'react'
import { FollowButton } from '../src/FollowButton'

export default {
	title: 'x-follow-button'
}

export const _FollowButton = (args) => {
	return <FollowButton {...args} />
}

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
