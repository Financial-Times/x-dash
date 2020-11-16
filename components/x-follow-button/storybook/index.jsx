import React from 'react'

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import { FollowButton } from '../src/FollowButton'

const defaultProps = {
	isFollowed: false,
	variant: 'standard',
	conceptNameAsButtonText: false,
	conceptId: '00000-0000-00000-00000',
	conceptName: 'UK politics & policy',
	followPlusDigestEmail: true,
	csrfToken: 'testTokenValue'
}

const toggleConceptNameAsButtonText = () =>
	boolean('conceptNameAsButtonText', defaultProps.conceptNameAsButtonText)
const toggleIsFollowed = () => boolean('isFollowed', defaultProps.isFollowed)
const toggleConceptName = () => text('Topic name', defaultProps.conceptName)
const toggleFollowPlusDigestEmail = () => boolean('followPlusDigestEmail', defaultProps.followPlusDigestEmail)
const toggleVariant = () =>
	select('variant', ['standard', 'inverse', 'opinion', 'monochrome'], defaultProps.variant)

export default {
	title: 'x-follow-button',
	decorators: [withKnobs]
}

export const _FollowButton = () => {
	const knobs = {
		conceptNameAsButtonText: toggleConceptNameAsButtonText(),
		isFollowed: toggleIsFollowed(),
		conceptName: toggleConceptName(),
		followPlusDigestEmail: toggleFollowPlusDigestEmail(),
		variant: toggleVariant()
	}

	return <FollowButton {...defaultProps} {...knobs} />
}
