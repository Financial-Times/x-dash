import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import BasicLayout from './basic';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

const TemplateWrapper = ({children, ...props}) => <BasicLayout {...props}>{({sidebarTree, headerTree}) =>
	<Fragment>
		<Header tree={headerTree} />

		<div className='o-techdocs-container'>
			<div className='o-techdocs-layout'>
				<Sidebar tree={sidebarTree} />

				<div className="o-techdocs-main">
					{children()}
				</div>
			</div>
		</div>

		<Footer />
	</Fragment>
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
