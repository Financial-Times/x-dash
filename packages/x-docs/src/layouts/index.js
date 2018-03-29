import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import BasicLayout from './basic';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

import {wrapper, main} from './wrapper.module.scss';

const TemplateWrapper = ({children, ...props}) => <BasicLayout {...props}>{({sidebarTree, headerTree}) =>
	<div className={wrapper}>
		<Header tree={headerTree} />

		<div className={c('o-techdocs-container', main)}>
			<div className='o-techdocs-layout'>
				<Sidebar tree={sidebarTree} />

				<div className="o-techdocs-main">
					{children()}
				</div>
			</div>
		</div>

		<Footer />
	</div>
}</BasicLayout>;

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
	query SidebarPages {
		allSitePage {
			edges {
				node {
					...SidebarProps
				}
			}
		}
	}
`;
