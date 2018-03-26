import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import BasicLayout from './basic';

import Header from '../components/header';
import Sidebar, {Item, Section} from '../components/sidebar';

const TemplateWrapper = ({children, data}) => <BasicLayout>{() =>
	<div>
		<Header />

		<div className='o-techdocs-container'>
			<div className='o-techdocs-layout'>
				<Sidebar pages={data.allSitePage.edges} />

				<div class="o-techdocs-main">
					{children()}
				</div>
			</div>
		</div>
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
					id
					path
					context {
						sitemap {
							title
							breadcrumbs
						}
					}
				}
			}
		}
	}
`;
