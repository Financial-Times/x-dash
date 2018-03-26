import React from 'react'
import styles from './hero.module.scss';
import XLogo from '@financial-times/x-logo';
import c from 'classnames'

const Hero = () => <div className={styles.header}>
	<div className={styles.container}>
		<div className={c('o-techdocs-hero', styles.hero)}>
			<div className={styles.logo}>
				<XLogo />
			</div>

			<div className={styles.intro}>
				<h1 className="o-techdocs-hero__title">x-dash</h1>
			</div>
		</div>
	</div>
</div>;

export default Hero;
