import React from 'react'
import { LiveBlogPost } from '../src/LiveBlogPost'
import BuildService from '../../../.storybook/build-service'

import '../src/LiveBlogPost.scss'

const dependencies = {
	'o-fonts': '^5.3.0'
}

export default {
	title: 'x-live-blog-post',
	parameters: {
		escapeHTML: false
	}
}

export const ContentBody = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<LiveBlogPost {...args} />
			<LiveBlogPost {...args} />
		</div>
	)
}

ContentBody.args = {
	title: 'Turkey’s virus deaths may be 25% higher than official figure',
	byline: 'George Russell',
	isBreakingNews: false,
	standout: {
		breakingNews: false
	},
	bodyHTML:
		'<p>Turkey&#x2019;s death toll from coronavirus could be as much as 25 per cent higher than the government&#x2019;s official tally, adding the country of 83m people to the raft of nations that have struggled to accurately capture the impact of the pandemic.</p>\n<p>Ankara has previously rejected suggestions that municipal data from Istanbul, the epicentre of the country&#x2019;s Covid-19 outbreak, showed that there were more deaths from the disease than reported.</p>\n<p>But an analysis of individual death records by the Financial Times raises questions about the Turkish government&#x2019;s explanation for a spike in all-cause mortality in the city of almost 16m people.</p>\n<p><a href="https://www.ft.com/content/80bb222c-b6eb-40ea-8014-563cbe9e0117" target="_blank">Read the article here</a></p>\n<p><img class="picture" src="http://blogs.ft.com/the-world/files/2020/05/istanbul_excess_morts_l.jpg"></p>',
	id: '12345',
	publishedDate: '2020-05-13T18:52:28.000Z',
	articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
	showShareButtons: true,
	backToTop: '#Top'
}

export const ContentBodyWithBackToTopButton = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<LiveBlogPost {...args} />
			<LiveBlogPost {...args} />
		</div>
	)
}

ContentBodyWithBackToTopButton.args = {
	title: 'Turkey’s virus deaths may be 25% higher than official figure',
	byline: 'George Russell',
	isBreakingNews: false,
	standout: {
		breakingNews: false
	},
	bodyHTML:
		'<p>Turkey&#x2019;s death toll from coronavirus could be as much as 25 per cent higher than the government&#x2019;s official tally, adding the country of 83m people to the raft of nations that have struggled to accurately capture the impact of the pandemic.</p>\n<p>Ankara has previously rejected suggestions that municipal data from Istanbul, the epicentre of the country&#x2019;s Covid-19 outbreak, showed that there were more deaths from the disease than reported.</p>\n<p>But an analysis of individual death records by the Financial Times raises questions about the Turkish government&#x2019;s explanation for a spike in all-cause mortality in the city of almost 16m people.</p>\n<p><a href="https://www.ft.com/content/80bb222c-b6eb-40ea-8014-563cbe9e0117" target="_blank">Read the article here</a></p>\n<p><img class="picture" src="http://blogs.ft.com/the-world/files/2020/05/istanbul_excess_morts_l.jpg"></p>',
	id: '12345',
	publishedDate: '2020-05-13T18:52:28.000Z',
	articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
	showShareButtons: true,
	backToTop: () => {}
}
