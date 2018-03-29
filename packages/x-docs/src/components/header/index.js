import React from 'react'
import Link from 'gatsby-link'
import c from 'classnames';
import XLogo from '@financial-times/x-logo';
import Search from '../search';
import map from 'lodash.map';

import styles from './header.module.scss';
import {splashBackground} from '../../styles/splash/splash.module.scss';

const Header = ({splash, tree}) => <header
	className={c(styles.header, {[splashBackground]: !splash})}
>
	<div className={styles.left}>
		<span class={styles.item}>
			<Search />
		</span>
	</div>

		{!splash &&
			<div className={styles.center}>
				<Link className={styles.link} to="/" exact>
					<XLogo className={styles.logo} density={7} />
					<span className={styles.logoText}>x-dash</span>
				</Link>
			</div>
		}

	<div className={styles.right}>
		{map(tree.children, ({href}, title) => <Link className={styles.link} activeClassName={styles.active} to={href}>
			{title}
		</Link>)}
	</div>
</header>

export default Header
