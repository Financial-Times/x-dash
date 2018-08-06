import React from 'react';
import Layout from '../components/layouts/splash';
import Hero from '../components/hero';
import Icon from '../components/icon';

export default () => (
	<Layout title="Welcome">
		<Hero />
		<div className="intro">
			<div className="intro__container">
				<div className="intro__module">
					<h2>For FT.com developers</h2>
					<ul>
						<li>
							<Icon className="intro__icon" icon="newspaper" />
							No more copy-and-pasting templates. Import components with well-defined, explorable
							use-cases.
						</li>
						<li>
							<Icon className="intro__icon" icon="link" />
							Works with the renderer and build tooling you're already using, no need for glue code.
						</li>
						<li>
							<Icon className="intro__icon" icon="list" />
							Components are logic-less, with denormalised data stored in Elasticsearch, so apps are
							faster and simpler.
						</li>
					</ul>
				</div>
				<div className="intro__module">
					<h2>For component authors</h2>
					<ul>
						<li>
							<Icon className="intro__icon" icon="video" />
							Live-editable preview of every component without the headache of setting up a
							development server.
						</li>
						<li>
							<Icon className="intro__icon" icon="users" />
							Write a component once, and it works across every app already using x-dash.
						</li>
						<li>
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
