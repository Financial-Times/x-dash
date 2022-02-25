import { ArticleSaveButton } from '../src/ArticleSaveButton'
import React from 'react'
import BuildService from '../../../.storybook/build-service'

import '../src/ArticleSaveButton.scss'

const dependencies = {
	'o-normalise': '^3.2.2',
	'o-fonts': '^5.3.0'
}

export default {
	title: 'x-article-save-button'
}

export const SaveButton = (args) => (
	<div className="story-container">
		<BuildService dependencies={dependencies} />
		<ArticleSaveButton {...args} />
	</div>
)

SaveButton.args = {
	contentId: '0000-0000-0000-0000',
	contentTitle: 'UK crime agency steps up assault on Russian dirty money',
	csrfToken: 'dummy-token',
	saved: false,
	trackableId: 'trackable-id'
}
