import { h } from '@financial-times/x-engine'

export default function ScoopLabel() {
	// TODO, create o-teaser__labels o-teaser__labels--scoop and swap with o-teaser__timestamp later
	return (
		<div className="o-teaser__timestamp">
			<span className="o-labels o-labels--content-scoop">Exclusive</span>
			<span className="o3-visually-hidden">&nbsp;content</span>
		</div>
	)
}
