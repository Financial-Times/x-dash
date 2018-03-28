import React from 'react'
import Link from 'gatsby-link'
import c from 'classnames';
import XLogo from '@financial-times/x-logo';
import Search from '../search';

import styles from './header.module.scss';
import {splashBackground} from '../../styles/splash/splash.module.scss';

const Header = ({splash}) => <header
	className={c(styles.header, {[splashBackground]: !splash})}
>
	<div className={styles.left}>
		<span class={styles.item}>
			<Search />
		</span>
	</div>

		{!splash &&
			<div className={styles.center}>
				<Link className={styles.link} to="/">
					<XLogo className={styles.logo} density={7} />
					<span className={styles.logoText}>x-dash</span>
				</Link>
			</div>
		}

	<div className={styles.right}>
		<a className={styles.link} href="https://origami.ft.com">
			Origami
		</a>
		<Link className={styles.link} to="/components">
			Components
		</Link>
	</div>
</header>

export default Header
