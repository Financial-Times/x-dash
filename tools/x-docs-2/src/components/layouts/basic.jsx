import React from 'react';
import Helmet from 'react-helmet';
// import { StaticQuery, graphql } from 'gatsby';
// import { Link } from 'gatsby';

export default ({ title, children }) => (
	<>
		<Helmet title={title} />
		<div>{children}</div>
	</>
);
