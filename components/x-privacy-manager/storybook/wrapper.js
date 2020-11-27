import React from 'react'

import { PrivacyManager } from '../src/privacy-manager'

// Using a wrapper means that the component can avoid defining its own dimensions
// Layout is best handled by the consuming app
export function Wrapper(props) {
	return (
		<div style={{ maxWidth: 740, margin: 'auto' }}>
			<PrivacyManager {...props} />
		</div>
	)
}
