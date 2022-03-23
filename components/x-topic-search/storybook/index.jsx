import React from 'react'
import { TopicSearch } from '../src/TopicSearch'
import BuildService from '../../../.storybook/build-service'

import '../src/TopicSearch.scss'

// Set up basic document styling using the Origami build service
const dependencies = {
	'o-fonts': '^5.3.0'
}

export default {
	title: 'x-topic-search'
}

export const _TopicSearchBar = (args) => {
	return (
		<div className="story-container">
			<BuildService dependencies={dependencies} />
			<TopicSearch {...args} />
		</div>
	)
}

_TopicSearchBar.args = {
	minSearchLength: 2,
	maxSuggestions: 10,
	apiUrl: '//tag-facets-api.ft.com/annotations',
	followedTopicIds: ['f95d1e16-2307-4feb-b3ff-6f224798aa49'],
	csrfToken: 'csrfToken'
}

_TopicSearchBar.argTypes = {
	minSearchLength: { name: 'Minimum search start length' },
	maxSuggestions: { name: 'Maximum sugggestions to show' },
	apiUrl: { name: 'URL of the API to use' },
	followedTopicIds: {
		type: 'select',
		name: 'Followed Topics',
		options: {
			None: [],
			'World Elephant Water Polo': ['f95d1e16-2307-4feb-b3ff-6f224798aa49'],
			'Brexit, Britain after Brexit, Brexit Unspun Podcast': [
				'19b95057-4614-45fb-9306-4d54049354db',
				'464cc2f2-395e-4c36-bb29-01727fc95558',
				'c4e899ed-157e-4446-86f0-5a65803dc07a'
			]
		}
	},
	csrfToken: { name: 'CSRF Token' }
}
