import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {buildSidebarTree} from '../components/sidebar';
import findKey from 'lodash.findkey';

import '../styles/base.scss';

const TemplateWrapper = ({children, data, ...props}) => {
	const baseTree = buildSidebarTree(data.allSitePage.edges);
	const headerTree = baseTree;

	const currentTopLevel = findKey(
		baseTree.children,
		({href}) => props.location.pathname.startsWith(href)
	);

	const sidebarTree = baseTree.children[currentTopLevel] || baseTree;

	return <div>
		<Helmet
			title="Gatsby Default Starter"
			meta={[
				{ name: 'description', content: 'Sample' },
				{ name: 'keywords', content: 'sample, something' },
			]}
		>
			<link href="https://fonts.googleapis.com/css?family=Lato:300,300i,700,700i|Muli:200" rel="stylesheet" />
		</Helmet>

		{children({
			sidebarTree,
			headerTree,
		})}
	</div>
};

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;
