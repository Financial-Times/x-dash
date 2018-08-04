import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../header/banner';

export default ({ title, children }) => (
	<div className="site-layout">
		<Helmet title={title} />
		<header className="site-layout__header">
			<Banner />
		</header>
		<main className="site-layout__content" role="main">{children}</main>
		<div className="site-layout__sidebar" role="complementary"></div>
		<footer className="site-layout__footer" role="contentinfo"></footer>
	</div>
);
