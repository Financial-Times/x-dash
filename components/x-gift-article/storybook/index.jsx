const { GiftArticle } = require('../dist/GiftArticle.cjs')
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
const pkg = require('../package.json')

const dependencies = {
	'o-fonts': '^3.0.0'
}

storiesOf('x-gift-article', module)
	.addDecorator(withKnobs)
	.add('With gift credits', () => {
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
	})
	.add('Without gift credits', () => {
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
	})
	.add('With gift link', () => {
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
	})
	.add('Free article', () => {
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
	})
	.add('Native share', () => {
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
	})
	.add('Error response', () => {
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
	})
