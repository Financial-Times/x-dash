import React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layouts/basic';

export default ({ pathContext }) => {
	return (
		<Layout title={pathContext.title}>
			<div dangerouslySetInnerHTML={{ __html: pathContext.readme }} />
		</Layout>
	);
};
