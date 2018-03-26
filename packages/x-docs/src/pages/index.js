import React from 'react';
import Link from 'gatsby-link';
import Hero from '../components/hero';
import Header from '../components/header';
import styles from './home.module.scss';
import c from 'classnames';

console.log(styles);

const IndexPage = () => <div className={styles.wrapper}>
	<Header transparent />
	<Hero />

	<div className={styles.main}>
		<div className={c('o-techdocs-container', styles.grid)}>
			<div className='o-techdocs-layout'>
				<div className='o-techdocs-main'>
					<div className='o-techdocs-content'>
						<h1>Hello</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

export default IndexPage;
