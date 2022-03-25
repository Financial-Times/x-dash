import React from 'react'
import { TeaserTimeline } from '../src/TeaserTimeline'
import BuildService from '../../../.storybook/build-service'
import items from './content-items.json'

import '../src/TeaserTimeline.scss'

const dependencies = {
	'o-typography': '^7.0.0',
	'o-teaser': '^6.0.0'
}

export default {
	title: 'x-teaser-timeline'
}

export const Timeline = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<TeaserTimeline {...args} />
		</div>
	)
}

Timeline.args = {
	items,
	timezoneOffset: -60,
	localTodayDate: '2018-10-17',
	latestItemsTime: '2018-10-17T12:10:33.000Z',
	customSlotContent: 'Custom slot content',
	customSlotPosition: 3
}
Timeline.argTypes = {
	latestItemsTime: {
		control: { type: 'select', options: { None: '', '2018-10-17T12:10:33.000Z': '2018-10-17T12:10:33.000Z' } }
	},
	customSlotContent: {
		control: { type: 'select', options: { None: '', Something: '---Custom slot content---' } }
	}
}
