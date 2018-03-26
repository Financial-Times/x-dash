import React from 'react'
import styles from './hero.module.scss';
import XLogo from '@financial-times/x-logo';
import c from 'classnames'

const Hero = () => <div className={styles.wrapper}>
	<div className={styles.container}>
		<div className={c('o-techdocs-hero', styles.hero)}>
			<div className={styles.logo}>
				<XLogo />
			</div>

			<div className={styles.intro}>
				<h1 className={c("o-techdocs-hero__title", styles.title)}>x-dash</h1>

				<p className={c('o-techdocs-hero__summary', styles.summary)}>
					Shared frontend markup for FT.com apps.
				</p>
				<p className={c('o-techdocs-hero__summary', styles.summary)}>
					Adaptable components, transparent build tooling &amp; straightforward data.
				</p>
				<div className='o-techdocs-hero__actions'>
					<a href="#get-started" class="o-buttons o-buttons--big o-buttons--inverse" title="Developer guide">
						Get started
					</a>
				</div>
			</div>
		</div>
	</div>
</div>;

export default Hero;
