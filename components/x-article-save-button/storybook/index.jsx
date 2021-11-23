import React from 'react'
import { ArticleSaveButton } from '../src/ArticleSaveButton'
import BuildService from '../../../.storybook/build-service'

// Set up basic document styling using the Origami build service
const dependencies = {
	'o-fonts': '^3.0.0'
}

export default {
	title: 'x-article-save-button'
}

export const _ArticleSaveButton = (args) => {
	return (
		<div className="story-container">
			<BuildService dependencies={dependencies} />
			<ArticleSaveButton {...args} />
		</div>
	)
}

_ArticleSaveButton.args = {
	saved: false,
	csrfToken: 'dummy-token',
	trackableId: 'trackable-id',
	contentId: '0000-0000-0000-0000',
	contentTitle: 'UK crime agency steps up assault on Russian dirty money'
}

_ArticleSaveButton.argTypes = {
	csrfToken: { name: 'CSRF token' },
	contentId: { name: 'Content ID' },
	contentTitle: { name: 'Content title' },
	trackableId: { name: 'Trackable ID' },
	saved: { name: 'Saved' }
}
