import React from 'react';
import components from '@financial-times/x-workbench';
import Helmet from 'react-helmet';
import url from 'url';
import Shadow from 'react-shadow'
import {withPrefix} from 'gatsby-link';

import styles from './story.module.scss';
import Content from '../components/content';

const formatModulesString = deps => Object.keys(deps).map(
	dep => `${dep}@${deps[dep]}`
).join(',');

const formatBuildServiceUrl = deps => url.format({
	protocol: 'https',
	host: 'www.ft.com',
	pathname: '__origami/service/build/v2/bundles/css',
	query: {
		modules: formatModulesString(deps)
	},
	hash: '.css', // fake extension so react-shadow knows how to load it
});

const formatStorybookUrl = ({componentName, componentStory}) => withPrefix(
	url.format({
		pathname: '/storybook/index.html',
		query: {
			selectedKind: componentName,
			selectedStory: componentStory,
		},
	})
);

module.exports = ({pathContext: {componentName, componentStory, componentStyles, sitemap: {title}}}) => {
	const story = components[componentName][componentStory];
	const includes = [
		story.dependencies && formatBuildServiceUrl(story.dependencies),
		story.package.style && `/components/${componentName}/${story.package.style}`,
	].filter(Boolean);

	return <Content>
		<h1>
			{title}
			<a href={formatStorybookUrl({componentName, componentStory})} className={styles.storybookLink} target='_blank' rel="noopener noreferrer">
				Explore demo in Storybook
			</a>
		</h1>

		<Helmet title={`x-dash ◆ ${title}`}>
			{/* component prolly needs fonts but apparently you can't load those in shadow dom */}
			<link rel='stylesheet' href={formatBuildServiceUrl({
				'o-fonts': '^3'
			})} />
		</Helmet>

		<Shadow include={includes}>
			<div className={styles.shadow}>
				{componentStyles && <style>{componentStyles}</style>}

				{story.component(story.data)}
			</div>
		</Shadow>
	</Content>;
};
