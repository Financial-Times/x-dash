import React from 'react';
import styles from './package-card.module.scss';
import Link from 'gatsby-link';
import path from 'path';

export default ({name, version, description, stories, base}) => (
	<Link to={`/${base}/${path.basename(name)}`} className={styles.card}>
		<h2 className={styles.header}>
			{name}
			<span className={styles.label}>v{version}</span>
			{stories && <span className={styles.label}>{Object.keys(stories).length} demos</span>}
		</h2>
		<p className={styles.description}>{description}</p>
	</Link>
);

export const packageCard = graphql`
	fragment PackageCard on Package {
		id
		stories
		pkgJson {
			name
			version
			description
		}
		base
	}
`
