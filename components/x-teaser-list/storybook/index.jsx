import React from 'react'
import { TeaserList } from '../src/TeaserList'
import BuildService from '../../../.storybook/build-service'

const dependencies = {
	'o-normalise': '^2.0.0',
	'o-typography': '^6.0.0',
	'o-teaser': '^5.0.0'
}

export default {
	title: 'x-teaser-list'
}

export const _TeaserList = (args) => {
	return (
		<div className="story-container">
			<BuildService dependencies={dependencies} />
			<TeaserList {...args} />
		</div>
	)
}

_TeaserList.args = {
	showSaveButtons: true,
	csrfToken: 'dummy-token',
	items: require('./content-items.json')
}

_TeaserList.argTypes = {
	showSaveButtons: { name: 'Show save buttons' }
}
