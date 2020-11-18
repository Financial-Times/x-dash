const { TeaserTimeline } = require('../dist/TeaserTimeline.cjs')
import React from 'react'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
const pkg = require('../package.json')
const { args, argTypes } = require('./timeline')

const dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0',
	'o-teaser': '^2.3.1'
}

export default {
	title: 'x-teaser-timeline'
}

export const Timeline = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-teaser-timeline/${pkg.style}`} />
				</Helmet>
			)}
			<TeaserTimeline {...args} />
		</div>
	)
}

Timeline.args = args
Timeline.argTypes = argTypes
