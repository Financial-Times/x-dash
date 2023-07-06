import { GiftArticle, ShareArticleModal } from '../src/GiftArticle'
import fetchMock from 'fetch-mock'
import React from 'react'
import BuildService from '../../../.storybook/build-service'

import '../src/main.scss'

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

export const ShareArticleModalB2B = (args) => {
	require('./share-article-modal').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2B.storyName = 'Share article modal (B2B)'
ShareArticleModalB2B.args = require('./share-article-modal').args

export const ShareArticleModalB2C = (args) => {
	require('./share-article-modal-b2c').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2C.storyName = 'Share article modal (B2C)'
ShareArticleModalB2C.args = require('./share-article-modal-b2c').args

export const ShareArticleModalWithAdvanceSharing = (args) => {
	require('./share-article-modal-with-advanced-sharing').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvanceSharing.storyName = 'Share article modal (B2B with Advanced Sharing)'
ShareArticleModalWithAdvanceSharing.args = require('./share-article-modal-with-advanced-sharing').args

export const ShareArticleModalB2CNoCredits = (args) => {
	require('./share-article-modal-b2c-no-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2CNoCredits.storyName = 'Share article modal (B2C no credits)'
ShareArticleModalB2CNoCredits.args = require('./share-article-modal-b2c-no-credits').args

export const ShareArticleModalB2BNoCredits = (args) => {
	require('./share-article-modal-no-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BNoCredits.storyName = 'Share article modal (B2B no credits)'
ShareArticleModalB2BNoCredits.args = require('./share-article-modal-no-credits').args

export const ShareArticleModalWithAdvancedSharingNoGiftCredits = (args) => {
	require('./share-article-modal-with-advanced-sharing-no-gift-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingNoGiftCredits.storyName = 'Share article modal (AS no gift credits)'
ShareArticleModalWithAdvancedSharingNoGiftCredits.args =
	require('./share-article-modal-with-advanced-sharing-no-gift-credits').args

export const ShareArticleModalWithAdvancedSharingNoEnterpriseCredits = (args) => {
	require('./share-article-modal-with-advanced-sharing-no-enterprise-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingNoEnterpriseCredits.storyName =
	'Share article modal (AS no enterprise credits)'
ShareArticleModalWithAdvancedSharingNoEnterpriseCredits.args =
	require('./share-article-modal-with-advanced-sharing-no-enterprise-credits').args

export const ShareArticleModalWithAdvancedSharingSaveHighlightsMessage = (args) => {
	require('./share-article-modal-with-advanced-sharing-save-highlights-message').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingSaveHighlightsMessage.storyName =
	'Share article modal (AS save highlights message)'
ShareArticleModalWithAdvancedSharingSaveHighlightsMessage.args =
	require('./share-article-modal-with-advanced-sharing-save-highlights-message').args

export const ShareArticleModalB2BFreeArticle = (args) => {
	require('./share-article-modal-b2b-free-article').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BFreeArticle.storyName = 'Share article modal (B2B free article)'
ShareArticleModalB2BFreeArticle.args = require('./share-article-modal-b2b-free-article').args

export const ShareArticleModalB2CFreeArticle = (args) => {
	require('./share-article-modal-b2c-free-article').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2CFreeArticle.storyName = 'Share article modal (B2C free article)'
ShareArticleModalB2CFreeArticle.args = require('./share-article-modal-b2c-free-article').args

export const ShareArticleModalWithAdvancedSharingFreeArticle = (args) => {
	require('./share-article-modal-with-advanced-sharing-free-article').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingFreeArticle.storyName = 'Share article modal (AS free article)'
ShareArticleModalWithAdvancedSharingFreeArticle.args =
	require('./share-article-modal-with-advanced-sharing-free-article').args
