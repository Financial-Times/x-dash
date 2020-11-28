import React from 'react'
import { Helmet } from 'react-helmet'

import BuildService from '../../../.storybook/build-service'
import { default as pkg } from '../package.json'
import { PrivacyManager } from '../src/privacy-manager'

const dependencies = {
	'o-loading': '^4.0.0',
	'o-message': '^4.0.0',
	'o-typography': '^6.0.0'
}

/**
 * @param {import("../typings/x-privacy-manager").PrivacyManagerProps} args
 */
export function StoryContainer(args) {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/x-privacy-manager/${pkg.style}`} />
				</Helmet>
			)}
			<div style={{ maxWidth: 740, margin: 'auto' }}>
				<PrivacyManager {...args} />
			</div>
		</div>
	)
}
