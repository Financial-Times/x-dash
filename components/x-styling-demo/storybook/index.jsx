const { Button } = require('../dist/Button.cjs')
import React from 'react'
import { Helmet } from 'react-helmet'
const path = require('path')
const pkg = require('../package.json')
const name = path.basename(pkg.name)

export default {
	title: 'x-styling-demo'
}

export const Styling = (args) => {
	return (
		<div className="story-container">
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Button {...args} />
		</div>
	)
}
Styling.args = { danger: false, large: false }
