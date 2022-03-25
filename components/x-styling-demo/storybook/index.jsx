import { Button } from '../src/Button'
import React from 'react'

import '../src/Button.css'

export default {
	title: 'x-styling-demo'
}

export const Styling = (args) => {
	return (
		<div className="story-container">
			<Button {...args} />
		</div>
	)
}
Styling.args = { danger: false, large: false }
