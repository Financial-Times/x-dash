import React from 'react'
import { TeaserList } from '../src/TeaserList'
import BuildService from '../../../.storybook/build-service'

import '../src/TeaserList.scss'

const dependencies = {
	'o-date': '^7.0.1',
	'o-labels': '^7.1.0',
	'o-teaser': '^8.0.1',
	'o-video': '^8.0.0'
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
