import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import BasicLayout from './basic';
import Header from '../components/header';
import Footer from '../components/footer';

import {splashBackground} from '../styles/splash/splash.module.scss';

const TemplateWrapper = ({children, data, ...props}) => <BasicLayout data={data} {...props}>{({headerTree}) =>
	<Fragment>
		<Helmet
			bodyAttributes={{
				class: splashBackground,
			}}
		/>

		<Header searchIndex={data.siteSearchIndex.index} tree={headerTree} splash />

		{children()}

		<Footer splash />
	</Fragment>
}</BasicLayout>;

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
	query SplashData {
		allSitePage {
			edges {
				node {
					...SidebarProps
				}
			}
		}

		siteSearchIndex {
			index
		}
	}
`;
