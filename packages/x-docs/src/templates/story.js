import React, {Fragment} from 'react';
import components from '@financial-times/x-workbench';
import pick from 'lodash.pick';
import Helmet from 'react-helmet';
import url from 'url';
import Shadow from 'react-shadow';

import styles from './story.module.scss';
import Content from '../components/content';

import '@webcomponents/shadydom';

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

module.exports = ({pathContext: {componentName, componentBook, sitemap: {title}}}) => {
	const story = components[componentName][componentBook];

	return <Content>
		<h1>{title}</h1>

		<Helmet>
			{/* component prolly needs fonts but apparently you can't load those in shadow dom */}
			<link rel='stylesheet' href={formatBuildServiceUrl({
				'o-fonts': '^3'
			})} />
		</Helmet>

		<Shadow include={[formatBuildServiceUrl(story.origamiDependencies)]}>
			<div className={styles.shadow}>
				{story.stories[title]({
					createProps: allowedProps => pick(story.fixture, allowedProps),
				})}
			</div>
		</Shadow>
	</Content>;
};
