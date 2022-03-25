import React from 'react'
import { Helmet } from 'react-helmet'

function buildServiceUrl(deps, type) {
	const modules = Object.keys(deps)
		.map((i) => `${i}@${deps[i]}`)
		.join(',')
	return `https://www.ft.com/__origami/service/build/v3/bundles/${type}?components=${modules}&brand=core&system_code=$$$-no-bizops-system-code-$$$`
}

class BuildService extends React.Component {
	constructor(props) {
		super(props)
		this.initialised = []
	}

	componentDidUpdate() {
		if (window.hasOwnProperty('Origami')) {
			for (const component in Origami) {
				if (typeof Origami[component].init === 'function') {
					const instance = Origami[component].init()
					this.initialised.concat(instance)
				}
			}
		}
	}

	componentWillUnmount() {
		this.initialised.forEach((instance) => {
			if (typeof instance.destroy === 'function') {
				instance.destroy()
			}
		})
	}

	render() {
		const js = buildServiceUrl(this.props.dependencies, 'js')
		const css = buildServiceUrl(this.props.dependencies, 'css')

		return (
			<Helmet>
				<script src={js}></script>
				<link rel="stylesheet" href={css} />
			</Helmet>
		)
	}
}

export default BuildService
