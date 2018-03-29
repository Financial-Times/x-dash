import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import BasicLayout from './basic';
import Header from '../components/header';
import Footer from '../components/footer';

import {splashBackground} from '../styles/splash/splash.module.scss';

const TemplateWrapper = ({children, ...props}) => <BasicLayout {...props}>{({headerTree}) =>
	<Fragment>
		<Helmet
			bodyAttributes={{
				class: splashBackground,
			}}
		/>

		<Header tree={headerTree} splash />

		{children()}

		<Footer splash />
	</Fragment>
}</BasicLayout>;

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
	query SplashSidebarPages {
		allSitePage {
			edges {
				node {
					...SidebarProps
				}
			}
		}
	}
`;
