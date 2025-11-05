import { h } from '@financial-times/x-engine'

export default function PremiumLabel() {
	return (
		// WARNING: Do not use the x-teaser__premium-label class to override styling.
		// The styling should be in o-teaser, not x-teaser.
		// Use o-teaser__labels or o-teaser__labels--premium instead of x-teaser__premium-label.
		<div className="x-teaser__premium-label o-teaser__labels o-teaser__labels--premium">
			<span className="o-labels o-labels--premium o-labels--content-premium">Premium</span>
			<span className="o3-visually-hidden">&nbsp;content</span>
		</div>
	)
}
