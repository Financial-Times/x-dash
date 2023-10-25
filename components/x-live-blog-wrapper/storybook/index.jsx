import React, { useEffect } from 'react'
import { LiveBlogWrapper } from '../src/LiveBlogWrapper'
import './index.scss'
import '@financial-times/x-live-blog-post/src/LiveBlogPost.scss'
import BuildService from '../../../.storybook/build-service'
import oTracking from '@financial-times/o-tracking';
import Expander  from '@financial-times/o-expander'
const dependencies = {
	'o-fonts': '^5.3.0'
}

const Ad = (props) => {
	const {
		slotName,
		targeting,
		defaultFormat = 'false',
		small = 'false',
		medium = 'false',
		large = 'false',
		extra = 'false',
		alignment = 'center'
	} = props

	const classes = `o-ads o-ads--${alignment} o-ads--transition`

	return (
		<div
			data-o-ads-name={slotName}
			data-o-ads-targeting={targeting}
			data-o-ads-formats-default={defaultFormat}
			data-o-ads-formats-small={small}
			data-o-ads-formats-medium={medium}
			data-o-ads-formats-large={large}
			data-o-ads-formats-extra={extra}
			data-o-ads-label="true"
			aria-hidden="true"
			tabIndex="-1"
			className={classes}
		/>
	)
}

const defaultProps = {
	message: 'Test',
	id: 'live-blog-wrapper',
	postTrackerConfig: {
		onEntersViewport: () => {},
		onRead: () => {},
		onError: () => {},
		usePostTracker: true
	},
	posts: [
		{
			id: 12345,
			title: 'Title 1',
			bodyHTML: '<p>Post 1</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T18:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12346,
			title: 'Title 2',
			bodyHTML: '<p>Post 2</p>',
			isBreakingNews: true,
			publishedDate: '2020-05-13T19:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12347,
			title: 'Title 3',
			bodyHTML: '<p>Post 3</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12348,
			title: 'Title 4',
			bodyHTML: '<p>Post 4</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12349,
			title: 'Title 5',
			bodyHTML: '<p>Post 5</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		}
	],
	ads: {
		1: <Ad />,
		2: <Ad />
	}
}



const defaultPropsTruncated = {
	message: 'Test',
	id: 'live-blog-wrapper',
	truncated: true,
	postTrackerConfig: {
		onEntersViewport: () => {},
		onRead: () => {},
		onError: () => {},
		usePostTracker: true
	},
	posts: [
		{
			id: 12345,
			title: 'Title 1',
			bodyHTML: `<div data-trackable="header-menu">
			<span>
				<div data-trackable="country-selector">
					<ul>
						<li data-trackable="china"><button>China</button></li>
					</ul>
				</div>
			</span>
		</div><p>Post 1</p><p>Post 1</p><p>Post 1</p><p>Post 1</p><p>Post 1</p><p>Post 1</p>`,
			isBreakingNews: false,
			publishedDate: '2020-05-13T18:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12346,
			title: 'Title 2',
			bodyHTML: '<p>Post 2</p><p>Post 2</p><p>Post 2</p><p>Post 2</p><p>Post 2</p><p>Post 2</p><p>Post 2</p>',
			isBreakingNews: true,
			publishedDate: '2020-05-13T19:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12347,
			title: 'Title 3',
			bodyHTML: '<p>Post 3</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12348,
			title: 'Title 4',
			bodyHTML: '<p>Post 4</p><p>Post 4</p><p>Post 4</p><p>Post 4</p><p>Post 4</p><p>Post 4</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		},
		{
			id: 12349,
			title: 'Title 5',
			bodyHTML: '<p>Post 5</p><p>Post 5</p><p>Post 5</p><p>Post 5</p><p>Post 5</p>',
			isBreakingNews: false,
			publishedDate: '2020-05-13T20:52:28.000Z',
			articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
			showShareButtons: true
		}
	],
	ads: {
		1: <Ad />,
		2: <Ad />
	}
}

export default {
	title: 'x-live-blog-wrapper',
	parameters: {
		escapeHTML: false
	}
}

export const ContentBody = (args) => (
	<div className="story-container">
		<BuildService dependencies={dependencies} />
		<LiveBlogWrapper {...args} />
	</div>
)

ContentBody.args = defaultProps

export const ContentBodyTruncated = (args) => {
	useEffect(() => {console.log("INIT O TRACKER")
		oTracking.init({test: true})
		oTracking.click.init("truncated-post");
		
			const posts = document.querySelectorAll('.x-live-blog-wrapper .truncated-post')
			if (posts) posts.forEach((post) => Expander.init(post))
		
	})
	return <div className="story-container">
		<BuildService dependencies={dependencies} />
		<LiveBlogWrapper {...args} />
	</div>
}

ContentBodyTruncated.args = defaultPropsTruncated