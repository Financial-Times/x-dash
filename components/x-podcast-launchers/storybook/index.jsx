const { PodcastLaunchers } = require('../dist/PodcastLaunchers.cjs')
const { brand } = require('@financial-times/n-concept-ids')
import React from 'react'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
const pkg = require('../package.json')

// Set up basic document styling using the Origami build service
const dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0',
	'o-buttons': '^5.16.6',
	'o-forms': '^7.0.0'
}

export default {
	title: 'x-podcast-launchers'
}

export const Example = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-podcast-launchers/${pkg.style}`} />
				</Helmet>
			)}
			<PodcastLaunchers {...args} />
		</div>
	)
}

Example.args = {
	conceptId: brand.rachmanReviewPodcast,
	conceptName: 'Rachman Review',
	isFollowed: false,
	csrfToken: 'token',
	acastRSSHost: 'https://access.acast.com',
	acastAccessToken: 'abc-123'
}
