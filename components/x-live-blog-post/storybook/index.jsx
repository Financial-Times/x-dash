import React from 'react'
import { LiveBlogPost } from '../src/LiveBlogPost'
import BuildService from '../../../.storybook/build-service'
import { RichText } from '@financial-times/cp-content-pipeline-ui'
import '../src/LiveBlogPost.scss'

const dependencies = {
	'o-fonts': '^5.3.0',
	'o-share': '^10.0.0'
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

export const ContentBodyWithRecommended = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<LiveBlogPost {...args} />
		</div>
	)
}

ContentBodyWithRecommended.args = {
	id: '12345',
	title: 'Turkey’s virus deaths may be 25% higher than official figure',
	byline: 'George Russell',
	isBreakingNews: false,
	standout: {
		breakingNews: false
	},
	bodyHTML:
		'<p>Dolor sit amet, consectetur adipiscing elit. Sed sit amet odio quis ante auctor dapibus. Sed dapibus cursus nisi, tincidunt sagittis sapien vehicula vitae. Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc. </p>\n' +
		'\t\t\t<aside class="n-content-recommended" role="complementary" data-trackable="recommended">\n' +
		'\t\t\t\t<h2 class="n-content-recommended__title">Recommended</h2>\n' +
		'\t\t\t\t\n' +
		'\t\t\t\t<ul><li><a href="/content/256ee824-9710-49d2-a8bc-f173e3f74286" data-trackable="link">Alibaba accused of ‘possible espionage’ at European hub</a></li></ul>\n' +
		'\t\t\t</aside>\n' +
		'\t\t<p>Aenean lobortis volutpat nunc vitae elementum. Aliquam venenatis urna massa. Morbi vitae dignissim nibh, id ullamcorper risus.</p><p>Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc. Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc.</p><p>Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc. Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc.</p><experimental><div class="n-content-layout" data-layout-name="auto" data-layout-width="full-grid"><div class="n-content-layout__container"><div class="n-content-layout__slot" data-slot-width="true">\n' +
		'\t\t\t<figure class="n-content-image n-content-image--full" style="width: 700px; max-width: 100%;">\n' +
		'\t\t\t\t<img alt data-image-type="image" src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fa81b5a6e-2a82-41a7-b264-7b26fb57f203.jpg?fit=scale-down&source=next&width=700">\n' +
		'\t\t\t\t\n' +
		'\t\t\t<figcaption class="n-content-image__caption">\n' +
		'\t\t\t\tVenezuela’s National Assembly  © AFP via Getty Images\n' +
		'\t\t\t</figcaption>\n' +
		'\t\t\n' +
		'\t\t\t</figure>\n' +
		'\t\t</div><div class="n-content-layout__slot" data-slot-width="true">\n' +
		'\t\t\t<figure class="n-content-image n-content-image--full" style="width: 700px; max-width: 100%;">\n' +
		'\t\t\t\t<img alt data-image-type="image" src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F5d23e2f6-aabb-413d-b86d-9b3f97f666ec.jpg?fit=scale-down&source=next&width=700">\n' +
		'\t\t\t\t\n' +
		'\t\t\t<figcaption class="n-content-image__caption">\n' +
		'\t\t\t\tValetta, Malta\n' +
		'\t\t\t</figcaption>\n' +
		'\t\t\n' +
		'\t\t\t</figure>\n' +
		'\t\t</div></div></div></experimental>',
	publishedDate: '2023-10-30T10:13:59.317Z',
	articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
	showShareButtons: true,
	backToTop: () => {}
}

export const CPContentPipelineBodyWithRecommended = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<LiveBlogPost renderRichText={RichText} {...args} />
		</div>
	)
}

CPContentPipelineBodyWithRecommended.args = {
	__typename: 'LiveBlogPost',
	id: '12345',
	title: 'Turkey’s virus deaths may be 25% higher than official figure',
	publishedDate: '2023-06-25T11:12:27.000Z',
	firstPublishedDate: '2023-07-17T11:09:45.122Z',
	standfirst: null,
	byline: {
		tree: {
			type: 'root',
			children: [
				{
					type: 'text',
					value: 'Mustumustus'
				}
			]
		}
	},
	standout: {
		breakingNews: false
	},
	topper: {
		__typename: 'BasicTopper',
		headline: 'Recommended',
		backgroundColour: 'paper',
		backgroundBox: null,
		textShadow: null,
		followButtonVariant: 'standard',
		intro: {
			source: 'standfirst',
			structured: {
				tree: {
					type: 'body',
					version: 1,
					children: []
				}
			}
		},
		displayConcept: null,
		genreConcept: null
	},
	body: {
		structured: {
			tree: {
				type: 'body',
				version: 1,
				children: [
					{
						type: 'paragraph',
						children: [
							{
								type: 'text',
								value:
									'Dolor sit amet, consectetur adipiscing elit. Sed sit amet odio quis ante auctor dapibus. Sed dapibus cursus nisi, tincidunt sagittis sapien vehicula vitae. '
							}
						]
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'text',
								value:
									'Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc. Aenean lobortis volutpat nunc vitae elementum. Aliquam venenatis urna massa. Morbi vitae dignissim nibh, id ullamcorper risus.'
							}
						]
					}
				]
			},
			references: [
				{
					type: 'recommended',
					teaser: {
						title: 'Alibaba accused of ‘possible espionage’ at European hub',
						id: '256ee824-9710-49d2-a8bc-f173e3f74286',
						url: 'https://www.ft.com/content/256ee824-9710-49d2-a8bc-f173e3f74286',
						relativeUrl: '/content/256ee824-9710-49d2-a8bc-f173e3f74286',
						type: 'article',
						publishedDate: '2023-10-05T04:00:43.336Z',
						firstPublishedDate: '2023-10-05T04:00:43.336Z',
						metaPrefixText: null,
						metaSuffixText: null,
						metaLink: {
							id: 'ee5ab00e-965c-44f5-b27b-61d40e18bcc9',
							url: 'https://www.ft.com/stream/ee5ab00e-965c-44f5-b27b-61d40e18bcc9',
							relativeUrl: '/stream/ee5ab00e-965c-44f5-b27b-61d40e18bcc9',
							prefLabel: 'Political espionage'
						},
						metaAltLink: null,
						image: {
							url: 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F8997fbf2-8091-4f67-94c5-fa170ae95d88.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
							width: 2290,
							height: 1288,
							altText: 'A logistics platform of Cainiao, the logistics branch of Alibaba'
						},
						indicators: {
							accessLevel: 'subscribed',
							isOpinion: false,
							isColumn: false,
							isPodcast: false,
							isEditorsChoice: false,
							isExclusive: false,
							isScoop: false
						}
					}
				}
			],
			text: 'Dolor sit amet, consectetur adipiscing elit. Sed sit amet odio quis ante auctor dapibus. Sed dapibus cursus nisi, tincidunt sagittis sapien vehicula vitae. Nulla iaculis tempus augue, a euismod nunc tempor sed. Aenean sodales sapien sit amet est interdum, nec finibus libero mollis. Nam in laoreet nunc, vel pretium nunc. Aenean lobortis volutpat nunc vitae elementum. Aliquam venenatis urna massa. Morbi vitae dignissim nibh, id ullamcorper risus.'
		}
	},
	articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
	showShareButtons: true,
	backToTop: () => {},
	mainImage: null,
	altTitle: { promotionalTitle: 'Recommended' },
	annotations: [],
	accessLevel: 'subscribed',
	canBeSyndicated: 'verify',
	originatingParty: 'FT',
	commentsEnabled: true,
	liveBlogFurtherReadingFlag: 'variant1'
}
