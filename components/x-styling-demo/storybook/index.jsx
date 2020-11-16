const { Button } = require('../dist/Button.cjs')
import React from 'react'
<<<<<<< HEAD
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
=======
import { storiesOf } from '@storybook/react'
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

storiesOf('x-styling-demo', module)
	.addDecorator(withKnobs)
	.add('Styling', () => {
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
	})
>>>>>>> dbbaa6f0 (converted buildStory to storiesOf storybook)
