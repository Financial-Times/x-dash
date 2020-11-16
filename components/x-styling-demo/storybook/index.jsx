const { Button } = require('../dist/Button.cjs')
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import createProps from '../../../.storybook/storybook.utils'
const path = require('path')
const pkg = require('../package.json')
const name = path.basename(pkg.name)

const knobs = (data, { boolean }) => ({
	danger() {
		return boolean('Danger', data.danger)
	},

	large() {
		return boolean('Large', data.large)
	}
})

export default {
	title: 'x-styling-demo',
	decorators: [withKnobs]
}

export const Styling = () => {
	const { data, knobs: storyKnobs } = require('./styling')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Button {...props} />
		</div>
	)
}
