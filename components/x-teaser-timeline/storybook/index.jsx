const { TeaserTimeline } = require('../dist/TeaserTimeline.cjs')
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
const pkg = require('../package.json')

const dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.3.1'
}

const knobs = require('./knobs')

export default {
	title: 'x-teaser-timeline',
	decorators: [withKnobs]
}

export const Timeline = () => {
	const { data, knobs: storyKnobs } = require('./timeline')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-teaser-timeline/${pkg.style}`} />
				</Helmet>
			)}
			<TeaserTimeline {...props} />
		</div>
	)
}
