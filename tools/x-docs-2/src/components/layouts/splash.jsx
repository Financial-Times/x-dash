import React from 'react';
import Helmet from 'react-helmet';
import Header from '../header';
import Footer from '../footer';

export default ({ title, children }) => (
	<div className="site-layout">
		<Helmet title={`${title} / x-dash`} />
		<header className="site-layout__header">
			<Header />
		</header>
		<main className="site-layout__hero" role="main">
			{children}
		</main>
		<footer className="site-layout__footer" role="contentinfo">
			<Footer />
		</footer>
	</div>
);
