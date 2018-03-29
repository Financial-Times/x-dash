import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

import BasicLayout from './basic';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

import styles from './wrapper.module.scss';

const TemplateWrapper = ({children, ...props}) => <BasicLayout {...props}>{({sidebarTree, headerTree}) =>
	<div className={styles.wrapper}>
		<Header tree={headerTree} />

		<div className={c('o-techdocs-container', styles.main, styles.container)}>
			<div className={c('o-techdocs-layout', styles.layout)}>
				<Sidebar className={styles.sidebar} tree={sidebarTree} />

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
