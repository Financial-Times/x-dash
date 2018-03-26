import React from 'react';
import Link from 'gatsby-link';
import Hero from '../components/hero';
import Header from '../components/header';
import styles from './home.module.scss';

console.log(styles);

const IndexPage = () => <div className={styles.header}>
	<Header transparent />
	<Hero />
</div>

export default IndexPage;
