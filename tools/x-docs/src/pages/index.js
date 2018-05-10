import React from 'react';
import Link from 'gatsby-link';
import Hero from '../components/hero';
import Header from '../components/header';
import Icon from '../components/icon';
import Helmet from 'react-helmet';
import styles from './home.module.scss';
import c from 'classnames';

const IndexPage = () => <div className={styles.wrapper}>
	<Hero />

	<div className={styles.main} id='get-started'>
		<div className={c('o-techdocs-container', styles.grid)}>
			<div className='o-techdocs-layout'>
				<div className={styles.section}>
					<h3>For FT.com developers</h3>
					<p>
						<Icon className={styles.sectionIcon} icon='newspaper' />
						No more copy-and-pasting templates. Import components with well-defined, explorable use-cases.
					</p>
					<p>
						<Icon className={styles.sectionIcon} icon='link' />
						Works with the renderer and build tooling you're already using, no need for glue code.
					</p>
					<p>
						<Icon className={styles.sectionIcon} icon='list' />
						Components are logic-less, with data stored denormalised in Elastic Search, so apps need less business logic.
					</p>
				</div>

				<div className={styles.section}>
					<h3>For component authors</h3>
					<p>
						<Icon className={styles.sectionIcon} icon='video' />
						Live-editable preview of every component in every use-case, without the headache of setting up a development server.
					</p>
					<p>
						<Icon className={styles.sectionIcon} icon='users' />
						Write a component once, and it works across every app already using x-dash.
					</p>
					<p>
						<Icon className={styles.sectionIcon} icon='download' />
						Get set up for development quickly. Components and build tools live in a unified monorepo.
					</p>
				</div>
			</div>

			<div className='o-techdocs-layout'>
				<h2 className={styles.kicker}>I want to learn about...</h2>

				<div className={styles.section}>
					<h3>Using components</h3>

					<ul>
						<li>
							<Link to='/guides/apps/getting-started'>
								Quick start
							</Link>
						</li>
						<li>
							<Link to='/guides/apps/setup'>
								Full tutorial
							</Link>
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<h3>Developing components</h3>

					<ul>
						<li>
							<Link to='/guides/components/getting-started'>
								Quick start
							</Link>
						</li>
						<li>
							<Link to='/guides/components/setup'>
								Full tutorial
							</Link>
						</li>
						<li>
							<Link to='/guides/components/creating-a-component'>
								Creating a new component
							</Link>
						</li>
					</ul>
				</div>

				<div className={styles.section}>
					<h3>x-dash in depth</h3>

					<ul>
						<li>
							<Link to='/components'>
								Components
							</Link>
						</li>
						<li>
							<Link to='/packages'>
								Packages
							</Link>
						</li>
						<li>
							<Link to='/guides'>
								Guides
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

export default IndexPage;
