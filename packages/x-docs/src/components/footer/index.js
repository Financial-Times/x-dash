import React from 'react';
import styles from './footer.module.scss';
import c from 'classnames';

export default () => <footer className={c("o-techdocs-footer", styles.footer)}>
	<div className="o-techdocs-footer__inner">
		<p className="o-techdocs-footer__secondary"><a href="http://github.com/financial-times/ft-origami">View project on GitHub</a></p>
		<p>&copy; THE FINANCIAL TIMES LTD. FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
	</div>
</footer>
;
