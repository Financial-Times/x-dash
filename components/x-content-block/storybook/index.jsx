import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { ContentBlock } from '../src/ContentBlock';

const defaultProps = {
	mid: 12345,
	title: 'Turkey’s virus deaths may be 25% higher than official figure',
	content: '<p>Turkey&#x2019;s death toll from coronavirus could be as much as 25 per cent higher than the government&#x2019;s official tally, adding the country of 83m people to the raft of nations that have struggled to accurately capture the impact of the pandemic.</p>\n<p>Ankara has previously rejected suggestions that municipal data from Istanbul, the epicentre of the country&#x2019;s Covid-19 outbreak, showed that there were more deaths from the disease than reported.</p>\n<p>But an analysis of individual death records by the Financial Times raises questions about the Turkish government&#x2019;s explanation for a spike in all-cause mortality in the city of almost 16m people.</p>\n<p><a href="https://www.ft.com/content/80bb222c-b6eb-40ea-8014-563cbe9e0117" target="_blank">Read the article here</a></p>\n<p><img class="picture" src="http://blogs.ft.com/the-world/files/2020/05/istanbul_excess_morts_l.jpg"></p>',
	isBreakingNews: false,
	time: {
		format: 'MMM dd, HH:mm',
		iso: '2020-05-13T18:52:28.000Z',
		formatted: '5/13/2020, 19:52:28'
	},
	articleUrl: 'https://www.ft.com/content/2b665ec7-a88f-3998-8f39-5371f9c791ed',
	keytext: '',
	authordisplayname: 'Philip Georgiadis',
	textrendered: '<p>Turkey&#x2019;s death toll from coronavirus could be as much as 25 per cent higher than the government&#x2019;s official tally, adding the country of 83m people to the raft of nations that have struggled to accurately capture the impact of the pandemic.</p>\n<p>Ankara has previously rejected suggestions that municipal data from Istanbul, the epicentre of the country&#x2019;s Covid-19 outbreak, showed that there were more deaths from the disease than reported.</p>\n<p>But an analysis of individual death records by the Financial Times raises questions about the Turkish government&#x2019;s explanation for a spike in all-cause mortality in the city of almost 16m people.</p>\n<p><a href="https://www.ft.com/content/80bb222c-b6eb-40ea-8014-563cbe9e0117" target="_blank">Read the article here</a></p>\n<p><img class="picture" src="http://blogs.ft.com/the-world/files/2020/05/istanbul_excess_morts_l.jpg"></p>',
};

const toggleTitle = () => text('Title', defaultProps.title);
const toggleShowBreakingNews = () => boolean('Show breaking news', defaultProps.isBreakingNews);
const toggleContent = () => text('Content', defaultProps.content);
const toggleMid = () => text('mid', defaultProps.mid);
const toggleTime = () => ({
	format: text('Time format', defaultProps.time.format),
	iso: text('Time ISO', defaultProps.time.iso),
	formatted: text('Formatted time', defaultProps.time.formatted)
});
const toggleArticleUrl = () => text('Article URL', defaultProps.articleUrl);
const toggleKeyText = () => text('Key text', defaultProps.keytext);

// textrendered and authordisplayname properties will be removed
const toggleAuthor = () => text('Author', defaultProps.authordisplayname);
const toggleTextRendered = () => text('Text rendered', defaultProps.textrendered);

storiesOf('x-content-block', module)
	.addDecorator(withKnobs)
	.addParameters({
		knobs: {
			escapeHTML: false
		}
	})
	.add('Content Body', () => {
		const knobs = {
			title: toggleTitle(),
			isBreakingNews: toggleShowBreakingNews(),
			content: toggleContent(),
			mid: toggleMid(),
			time: toggleTime(),
			articleUrl: toggleArticleUrl(),
			keyText: toggleKeyText(),
			authordisplayname: toggleAuthor(),
			textrendered: toggleTextRendered(),
		};

		return <ContentBlock {...defaultProps} {...knobs} />;
	});
