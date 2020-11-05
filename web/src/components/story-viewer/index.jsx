import React from 'react'
import { withPrefix } from 'gatsby'

const StoryViewer = ({ name }) => {
	const queryString = `?path=/story/${name}--*`
	const iframeUrl = withPrefix(`/storybook/iframe.html${queryString}`)
	const linkUrl = withPrefix(`/storybook/index.html${queryString}`)

	return (
		<div id="component-demos" className="story-viewer">
			<h2 className="story-viewer__heading">Component demos</h2>
			<div className="story-viewer__panel">
				<iframe title={`${name} demo`} src={iframeUrl}></iframe>
			</div>
			<p className="story-viewer__footer">
				<a href={linkUrl}>View in Storybook</a>
			</p>
		</div>
	)
}

export default StoryViewer
