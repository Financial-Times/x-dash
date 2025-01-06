import { ShareArticleModal } from '../src/GiftArticle'
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

export const ShareArticleModalRegistered = (args) => {
	require('./share-article-modal-registered').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalRegistered.storyName = 'Share article modal (Registered)'
ShareArticleModalRegistered.args = require('./share-article-modal-registered').args

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

export const ShareArticleModalB2BHighlights = (args) => {
	require('./share-article-modal-b2b-highlights').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BHighlights.storyName = 'Share article modal (B2B with highlights)'
ShareArticleModalB2BHighlights.args = require('./share-article-modal-b2b-highlights').args

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

export const ShareArticleModalWithAdvancedSharingNoBothCredits = (args) => {
	require('./share-article-modal-with-advanced-sharing-no-both-credits').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingNoBothCredits.storyName = 'Share article modal (AS no enterprise credits)'
ShareArticleModalWithAdvancedSharingNoBothCredits.args =
	require('./share-article-modal-with-advanced-sharing-no-both-credits').args

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

export const ShareArticleModalB2BSaveHighlightsMessage = (args) => {
	require('./share-article-modal-b2b-save-highlights-message').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BSaveHighlightsMessage.storyName = 'Share article modal (B2B save highlights message)'
ShareArticleModalB2BSaveHighlightsMessage.args =
	require('./share-article-modal-b2b-save-highlights-message').args

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

export const ShareArticleModalWithAdvanceSharingMPRVersion = (args) => {
	require('./share-article-modal-with-advanced-sharing-mpr-version').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvanceSharingMPRVersion.storyName =
	'Share article modal (B2B with Advanced Sharing, MPR version)'
ShareArticleModalWithAdvanceSharingMPRVersion.args =
	require('./share-article-modal-with-advanced-sharing-mpr-version').args

export const ShareArticleModalWithAdvancedSharingNoEnterpriseCreditsMPRVersion = (args) => {
	require('./share-article-modal-with-advanced-sharing-no-enterprise-credits-mpr').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalWithAdvancedSharingNoEnterpriseCreditsMPRVersion.storyName =
	'Share article modal (AS no enterprise credits, MPR version)'
ShareArticleModalWithAdvancedSharingNoEnterpriseCreditsMPRVersion.args =
	require('./share-article-modal-with-advanced-sharing-no-enterprise-credits-mpr').args

export const ShareArticleModalB2BMPRVersion = (args) => {
	require('./share-article-modal-mpr-version').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BMPRVersion.storyName = 'Share article modal (B2B, MPR version)'
ShareArticleModalB2BMPRVersion.args = require('./share-article-modal-mpr-version').args

export const ShareArticleModalB2BNoCreditsMPRVersion = (args) => {
	require('./share-article-modal-no-credits-mpr-version').fetchMock(fetchMock)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<ShareArticleModal {...args} actionsRef={(actions) => actions?.activate()} />
		</div>
	)
}

ShareArticleModalB2BNoCreditsMPRVersion.storyName = 'Share article modal (B2B no credits, MPR version)'
ShareArticleModalB2BNoCreditsMPRVersion.args = require('./share-article-modal-no-credits-mpr-version').args
