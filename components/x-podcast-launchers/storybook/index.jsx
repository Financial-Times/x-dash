const { PodcastLaunchers } = require('../dist/PodcastLaunchers.cjs')
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
const pkg = require('../package.json')

// Set up basic document styling using the Origami build service
const dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0',
	'o-buttons': '^5.16.6',
	'o-forms': '^7.0.0'
}

const knobs = require('./knobs')

export default {
	title: 'x-podcast-launchers',
	decorators: [withKnobs]
}

export const Example = () => {
	const { data, knobs: storyKnobs } = require('./example')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-podcast-launchers/${pkg.style}`} />
				</Helmet>
			)}
			<PodcastLaunchers {...props} />
		</div>
	)
}
