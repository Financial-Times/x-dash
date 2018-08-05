import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../header/banner';

export default ({ title, children }) => (
	<div className="site-layout">
		<Helmet title={title} />
		<header className="site-layout__header">
			<Banner />
		</header>
		<main className="site-layout__hero" role="main">
			{children}
		</main>
		<footer className="site-layout__footer" role="contentinfo" />
	</div>
);
