const { PrivacyManager } = require('../src/privacy-manager')
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
const pkg = require('../package.json')

const dependencies = {
	'o-loading': '^4.0.0',
	'o-message': '^4.0.0',
	'o-typography': '^6.0.0'
}

const knobs = require('./knobs')

storiesOf('x-privacy-manager', module)
	.addDecorator(withKnobs)
	.add('Consent: indeterminate', () => {
		const { data, knobs: storyKnobs } = require('./story-consent-indeterminate')
		const props = createProps(data, storyKnobs, knobs)
		return (
			<div className="story-container">
				{dependencies && <BuildService dependencies={dependencies} />}
				{pkg.style && (
					<Helmet>
						<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
					</Helmet>
				)}
				<PrivacyManager {...props} />
			</div>
		)
	})
	.add('Consent: accepted', () => {
		const { data, knobs: storyKnobs } = require('./story-consent-accepted')
		const props = createProps(data, storyKnobs, knobs)
		return (
			<div className="story-container">
				{dependencies && <BuildService dependencies={dependencies} />}
				{pkg.style && (
					<Helmet>
						<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
					</Helmet>
				)}
				<PrivacyManager {...props} />
			</div>
		)
	})
	.add('Consent: blocked', () => {
		const { data, knobs: storyKnobs } = require('./story-consent-blocked')
		const props = createProps(data, storyKnobs, knobs)
		return (
			<div className="story-container">
				{dependencies && <BuildService dependencies={dependencies} />}
				{pkg.style && (
					<Helmet>
						<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
					</Helmet>
				)}
				<PrivacyManager {...props} />
			</div>
		)
	})
	.add('Save failed', () => {
		const { data, knobs: storyKnobs } = require('./story-save-failed')
		const props = createProps(data, storyKnobs, knobs)
		return (
			<div className="story-container">
				{dependencies && <BuildService dependencies={dependencies} />}
				{pkg.style && (
					<Helmet>
						<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
					</Helmet>
				)}
				<PrivacyManager {...props} />
			</div>
		)
	})
