import { Button } from '../src/Button'
import React from 'react'
import { Helmet } from 'react-helmet'

export default {
	title: 'x-styling-demo'
}

export const Styling = (args) => {
	return (
		<div className="story-container">
			<Helmet>
				<link rel="stylesheet" href={`components/@financial-times/x-styling-demo/dist/Button.css`} />
			</Helmet>
			<Button {...args} />
		</div>
	)
}
Styling.args = { danger: false, large: false }
