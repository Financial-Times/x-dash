const { GiftArticle } = require('../dist/GiftArticle.cjs')
import React from 'react'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
const pkg = require('../package.json')

const dependencies = {
	'o-fonts': '^3.0.0'
}

export default {
	title: 'x-gift-article'
}

export const WithGiftCredits = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

WithGiftCredits.story = {
	name: 'With gift credits'
}
WithGiftCredits.args = require('./with-gift-credits').args

export const WithoutGiftCredits = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

WithoutGiftCredits.story = {
	name: 'Without gift credits'
}
WithoutGiftCredits.args = require('./without-gift-credits').args

export const WithGiftLink = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

WithGiftLink.story = {
	name: 'With gift link'
}
WithGiftLink.args = require('./with-gift-link').args

export const FreeArticle = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

FreeArticle.story = {
	name: 'Free article'
}
FreeArticle.args = require('./free-article').args

export const NativeShare = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

NativeShare.story = {
	name: 'Native share'
}
NativeShare.args = require('./native-share').args

export const ErrorResponse = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-gift-article/${pkg.style}`} />
				</Helmet>
			)}
			<GiftArticle {...args} />
		</div>
	)
}

ErrorResponse.story = {
	name: 'Error response'
}
ErrorResponse.args = require('./error-response').args
