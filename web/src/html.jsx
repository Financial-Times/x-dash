import React from 'react';
import { withPrefix } from 'gatsby';

export default class HTML extends React.Component {
	render() {
		return (
			<html {...this.props.htmlAttributes} lang="en">
				<head>
					{this.props.headComponents}
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, viewport-fit=cover"
					/>
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
					<link rel="stylesheet" href={withPrefix('/main.css')} />
					<link rel="stylesheet" href={withPrefix('/prism.css')} />
					<link rel="icon" href="/favicon.ico" />
				</head>
				<body {...this.props.bodyAttributes}>
					<div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
					{this.props.postBodyComponents}
				</body>
			</html>
		);
	}
}
