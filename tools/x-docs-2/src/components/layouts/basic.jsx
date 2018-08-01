import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../header/banner';
// import { StaticQuery, graphql } from 'gatsby';
// import { Link } from 'gatsby';

export default ({ title, children }) => (
	<div className="site-layout">
		<Helmet title={title} />
		<header className="site-header">
			<Banner />
		</header>
		<main role="main">{children}</main>
		<nav role="complementary" className="site-sidebar"></nav>
		<footer role="contentinfo" className="site-footer"></footer>
	</div>
);
