import React from 'react'
import Link from 'gatsby-link'

const Header = () => <header className="o-header-services" data-o-component="o-header">
	<div className="o-header-services__top o-header-services__container">
		<div className="o-header-services__ftlogo"></div>
		<div className="o-header-services__title">
			<h1 className="o-header-services__product-name">
				<Link path="/">x-dash</Link>
			</h1>

			<span className="o-header-subrand__product-tagline ">Tagline to explain the docs</span>
		</div>
		<div className="o-header-services__related-content">
			<Link className="o-header-services__related-content-link" path="#">Related site</Link>
			<Link className="o-header-services__related-content-link" path="#">Sign in</Link>
		</div>
	</div>
</header>

export default Header
