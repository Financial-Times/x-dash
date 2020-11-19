const { PrivacyManager } = require('../src/privacy-manager')
const { defaultArgs, defaultArgTypes, fetchMock: privacyFM } = require('./data')
import fetchMock from 'fetch-mock'
import React from 'react'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
const pkg = require('../package.json')

const dependencies = {
	'o-loading': '^4.0.0',
	'o-message': '^4.0.0',
	'o-typography': '^6.0.0'
}

export default {
	title: 'x-privacy-manager'
}

export const ConsentIndeterminate = (args) => {
	privacyFM(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
				</Helmet>
			)}
			<PrivacyManager {...args} />
		</div>
	)
}

ConsentIndeterminate.story = {
	name: 'Consent: indeterminate'
}

ConsentIndeterminate.args = defaultArgs
ConsentIndeterminate.argTypes = defaultArgTypes

export const ConsentAccepted = (args) => {
	privacyFM(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
				</Helmet>
			)}
			<PrivacyManager {...args} />
		</div>
	)
}

ConsentAccepted.story = {
	name: 'Consent: accepted'
}
ConsentAccepted.args = {
	...defaultArgs,
	consent: true
}
ConsentAccepted.argTypes = defaultArgTypes

export const ConsentBlocked = (args) => {
	privacyFM(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
				</Helmet>
			)}
			<PrivacyManager {...args} />
		</div>
	)
}

ConsentBlocked.story = {
	name: 'Consent: blocked'
}
ConsentBlocked.args = {
	...defaultArgs,
	consent: false
}
ConsentBlocked.argTypes = defaultArgTypes

export const SaveFailed = (args) => {
	privacyFM(fetchMock, 500)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
				</Helmet>
			)}
			<PrivacyManager {...args} />
		</div>
	)
}

SaveFailed.story = {
	name: 'Save failed'
}
SaveFailed.args = defaultArgs
SaveFailed.argTypes = defaultArgTypes
