import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Sidebar, {Item, Section} from '../components/sidebar';

const TemplateWrapper = ({children, data}) => (
	<div>
		<Helmet
			title="Gatsby Default Starter"
			meta={[
				{ name: 'description', content: 'Sample' },
				{ name: 'keywords', content: 'sample, something' },
			]}
		/>

		<Header />

		<Sidebar>
			{data.allComponent.edges.map(
				({node}) => <Section key={node.id} title={node.kind}>
					{node.stories.map(
						({id, name, path}) => <Item href={path}>
							{name}
						</Item>
					)}
				</Section>
			)}
		</Sidebar>

		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '0px 1.0875rem 1.45rem',
				paddingTop: 0,
			}}
		>
			{children()}
		</div>
	</div>
);

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
	query SidebarComponents {
		allComponent {
			edges {
				node {
					id
					kind,
					stories: childrenStory {
						id
						name,
						path
					}
				}
			}
		}
	}
`;
