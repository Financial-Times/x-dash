import { ArticleSaveButton } from '../src/ArticleSaveButton'
import React from 'react'
import BuildService from '../../../.storybook/build-service'

const dependencies = {
	'o-colors': '^4.7.2',
	'o-icons': '^5.7.1',
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0'
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
