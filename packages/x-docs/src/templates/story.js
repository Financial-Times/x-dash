import React, {Fragment} from 'react';
import loadStories from '@financial-times/x-workbench/.storybook/load-stories';
import pick from 'lodash.pick';
import Helmet from 'react-helmet';
import url from 'url';

const stories = loadStories();

const formatModulesString = deps => Object.keys(deps).map(
	dep => `${dep}@${deps[dep]}`
).join(',');

const formatBuildServiceUrl = deps => url.format({
	protocol: 'https',
	host: 'www.ft.com',
	pathname: '__origami/service/build/v2/bundles/css',
	query: {
		modules: formatModulesString(deps)
	}
});

module.exports = ({pathContext: {componentName, componentBook, sitemap: {title}}}) => {
	console.log({
		componentName,
		componentBook
	})
	const story = stories[componentName][componentBook];

	return <Fragment>
		<Helmet>
			<link rel='stylesheet' href={formatBuildServiceUrl(story.origamiDependencies)} />
		</Helmet>

		{story.stories[title]({
			createProps: allowedProps => pick(story.fixture, allowedProps),
		})}
	</Fragment>;
};
