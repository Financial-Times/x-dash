import { GiftArticle } from '../src/GiftArticle'
import fetchMock from 'fetch-mock'
import React from 'react'
import BuildService from '../../../.storybook/build-service'

import '../src/GiftArticle.scss'

const dependencies = {
	'o-fonts': '^5.3.0'
}

export default {
	title: 'x-gift-article'
}

export const WithGiftCredits = (args) => {
	require('./with-gift-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithGiftCredits.storyName = 'With gift credits'
WithGiftCredits.args = require('./with-gift-credits').args

export const WithoutGiftCredits = (args) => {
	require('./without-gift-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

WithoutGiftCredits.storyName = 'Without gift credits'
WithoutGiftCredits.args = require('./without-gift-credits').args

export const WithGiftLink = (args) => {
	require('./with-gift-link').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} />
		</div>
	)
}

WithGiftLink.storyName = 'With gift link'
WithGiftLink.args = require('./with-gift-link').args

export const FreeArticle = (args) => {
	require('./free-article').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
FreeArticle.storyName = 'Free article'
FreeArticle.args = require('./free-article').args

export const FreeArticleWithEnterpriseSharing = (args) => {
	require('./free-article-with-enterprise-sharing').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
FreeArticleWithEnterpriseSharing.storyName = 'Free article with enterprise sharing'
FreeArticleWithEnterpriseSharing.args = require('./free-article-with-enterprise-sharing').args

export const WithEnterpriseSharing = (args) => {
	require('./with-enterprise').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithEnterpriseSharing.storyName = 'With enterprise sharing'
WithEnterpriseSharing.args = require('./with-enterprise').args

export const WithEnterpriseSharingWithoutCredits = (args) => {
	require('./with-enterprise-no-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithEnterpriseSharingWithoutCredits.storyName = 'With enterprise sharing (no credits)'
WithEnterpriseSharingWithoutCredits.args = require('./with-enterprise-no-credits').args

export const WithEnterpriseSharingFirstTimeUser = (args) => {
	require('./with-enterprise-first-time-user').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithEnterpriseSharingFirstTimeUser.storyName = 'With enterprise sharing (first time user)'
WithEnterpriseSharingFirstTimeUser.args = require('./with-enterprise-first-time-user').args

export const WithEnterpriseSharingRequestAccess = (args) => {
	require('./with-enterprise-request-access').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithEnterpriseSharingRequestAccess.storyName = 'With enterprise sharing (request access)'
WithEnterpriseSharingRequestAccess.args = require('./with-enterprise-request-access').args

export const WithEnterpriseSharingLink = (args) => {
	require('./with-enterprise-sharing-link').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}
WithEnterpriseSharingLink.storyName = 'With enterprise sharing (link generated)'
WithEnterpriseSharingLink.args = require('./with-enterprise-sharing-link').args

export const NativeShare = (args) => {
	require('./native-share').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

NativeShare.storyName = 'Native share'
NativeShare.args = require('./native-share').args

export const ErrorResponse = (args) => {
	require('./error-response').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<GiftArticle {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ErrorResponse.storyName = 'Error response'
ErrorResponse.args = require('./error-response').args
