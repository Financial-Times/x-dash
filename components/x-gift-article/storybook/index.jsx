const { GiftArticle } = require('../dist/GiftArticle.cjs')
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
const pkg = require('../package.json')

const dependencies = {
	'o-fonts': '^3.0.0'
}

export default {
	title: 'x-gift-article',
	decorators: [withKnobs]
}

export const WithGiftCredits = () => {
	const { data, knobs: storyKnobs } = require('./with-gift-credits')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

WithGiftCredits.story = {
	name: 'With gift credits'
}

export const WithoutGiftCredits = () => {
	const { data, knobs: storyKnobs } = require('./without-gift-credits')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

WithoutGiftCredits.story = {
	name: 'Without gift credits'
}

export const WithGiftLink = () => {
	const { data, knobs: storyKnobs } = require('./with-gift-link')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

WithGiftLink.story = {
	name: 'With gift link'
}

export const FreeArticle = () => {
	const { data, knobs: storyKnobs } = require('./free-article')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

FreeArticle.story = {
	name: 'Free article'
}

export const NativeShare = () => {
	const { data, knobs: storyKnobs } = require('./native-share')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

NativeShare.story = {
	name: 'Native share'
}

export const ErrorResponse = () => {
	const { data, knobs: storyKnobs } = require('./error-response')
	const props = createProps(data, storyKnobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...props} />
		</div>
	)
}

ErrorResponse.story = {
	name: 'Error response'
}
