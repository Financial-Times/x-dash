import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {buildSidebarTree} from '../components/sidebar';
import findKey from 'lodash.findkey';
import {withPrefix} from "gatsby-link";

import '../styles/base.scss';

const TemplateWrapper = ({children, data, ...props}) => {
	const baseTree = buildSidebarTree(data.allSitePage.edges);
	const headerTree = baseTree;

	const currentTopLevel = findKey(
		baseTree.children,
		({href}) => props.location.pathname.startsWith(withPrefix(href).replace(/\/$/, ''))
	);

	const sidebarTree = baseTree.children[currentTopLevel] || baseTree;

	return <div>
		<Helmet title="x-dash">
			<link href={withPrefix('/favicon.ico')} rel="icon" />
			<link href="https://fonts.googleapis.com/css?family=Lato:400|Muli:200,400,900|Roboto+Mono:400" rel="stylesheet" />
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
