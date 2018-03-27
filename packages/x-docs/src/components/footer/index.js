import React from 'react';
import styles from './footer.module.scss';
import c from 'classnames';
import parrot from './parrot.gif';

export default () => <footer className={c("o-techdocs-footer", styles.footer)}>
	<div className="o-techdocs-footer__inner">
		<p className="o-techdocs-footer__secondary">
			<a className={styles.githubLink} href="https://github.com/financial-times/x-dash">
				x-dash on Github
			</a>
			<img src={parrot} width={64} alt='Party Parrot' className={styles.parrot} />
		</p>
		<p>&copy; THE FINANCIAL TIMES LTD. FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
	</div>
</footer>
;
