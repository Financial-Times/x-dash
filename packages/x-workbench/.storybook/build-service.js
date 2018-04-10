import React from 'react';
import { Helmet } from 'react-helmet';

function buildServiceUrl(deps, type) {
	const modules = Object.keys(deps).map((i) => `${i}@${deps[i]}`).join(',');
	return `https://www.ft.com/__origami/service/build/v2/bundles/${type}?modules=${modules}`;
}

class BuildService extends React.Component {
	componentDidUpdate() {
		// Components only listen once and unbind after first invocation
		// document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	}

	render() {
		const js = buildServiceUrl(this.props.dependencies, 'js');
		const css = buildServiceUrl(this.props.dependencies, 'css');

		return (
			<Helmet>
				<script src={js}></script>
				<link rel="stylesheet" href={css} />
			</Helmet>
		);
	}
}

export default BuildService;
