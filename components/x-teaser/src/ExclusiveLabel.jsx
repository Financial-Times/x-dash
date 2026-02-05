import { h } from '@financial-times/x-engine'

export default function ExclusiveLabel() {
	return (
		<div className="o-teaser__labels o-teaser__labels--exclusive">
			<span className="o-labels o-labels--content-exclusive">Exclusive</span>
			<span className="o3-visually-hidden">&nbsp;content</span>
		</div>
	)
}
