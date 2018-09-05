import React from 'react';
import { Link } from 'gatsby';
import Icon from '../components/icon';
import Layout from '../components/layouts/splash';
import XLogo from '@financial-times/x-logo';

export default () => (
	<Layout title="Welcome">
		<div className="hero">
			<div className="content-container">
				<div className="hero__container">
					<div className="hero__logo">
						<XLogo />
					</div>
					<div className="hero__content">
						<h1 className="hero__heading">x-dash</h1>
						<p className="hero__description">Shared front-end for FT.com and The App.</p>
						<Link to="/docs" className="button button--inverse">Get started</Link>
					</div>
				</div>
			</div>
		</div>
		<div className="content-container">
			<div className="intro">
				<div className="intro__section">
					<h2 className="intro__heading">For FT.com developers</h2>
					<ul className="intro__list">
						<li className="intro__item">
							<Icon className="intro__icon" icon="newspaper" />
							No more copy-and-pasting templates. Import components with well-defined, explorable
							use-cases.
						</li>
						<li className="intro__item">
							<Icon className="intro__icon" icon="link" />
							Works with the renderer and build tooling you're already using, no need for glue code.
						</li>
						<li className="intro__item">
							<Icon className="intro__icon" icon="list" />
							Components are logic-less, with denormalised data stored in Elasticsearch, so apps are
							faster and simpler.
						</li>
					</ul>
				</div>
				<div className="intro__section">
					<h2 className="intro__heading">For component authors</h2>
					<ul className="intro__list">
						<li className="intro__item">
							<Icon className="intro__icon" icon="video" />
							Live-editable preview of every component without the headache of setting up a
							development server.
						</li>
						<li className="intro__item">
							<Icon className="intro__icon" icon="users" />
							Write a component once, and it works across every app already using x-dash.
						</li>
						<li className="intro__item">
							<Icon className="intro__icon" icon="download" />
							Get set up for development quickly. Components and build tools live in a unified
							monorepo.
						</li>
					</ul>
				</div>
			</div>
		</div>
	</Layout>
);
