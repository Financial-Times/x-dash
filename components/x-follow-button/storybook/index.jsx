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
		<div style={{ padding: '8px' }}>
			<p> Standard </p>
			<FollowButton {...args} variant={'standard'} />
		</div>
		<div style={{ background: '#990F3D', padding: '8px' }}>
			<p style={{ color: 'white' }}> Inverse </p>
			<FollowButton {...args} variant={'inverse'} />
		</div>
		<div style={{ background: '#CCE6FF', padding: '8px' }}>
			<p> Opinion </p>
			<FollowButton {...args} variant={'opinion'} />
		</div>
		<div style={{ background: '#355778', padding: '8px' }}>
			<p style={{ color: 'white' }}> Alphaville </p>
			<FollowButton {...args} variant={'alphaville'} />
		</div>
		<div style={{ background: 'black', padding: '8px' }}>
			<p style={{ color: 'white' }}> Monochrome </p>
			<FollowButton {...args} variant={'monochrome'} />
		</div>
		<div style={{ padding: '8px' }}>
			<p> Inverse Monochrome </p>
			<FollowButton {...args} variant={'inverse-monochrome'} />
		</div>
	</div>
)

_FollowButton.args = {
	conceptNameAsButtonText: false,
	isFollowed: false,
	conceptName: 'UK politics & policy',
	followPlusDigestEmail: true
}
