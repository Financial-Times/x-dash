import { h } from '@financial-times/x-engine'

const LiveBlogModifiers = {
	inprogress: 'live',
	comingsoon: 'pending',
	closed: 'closed'
}

export default ({ status, allowLiveTeaserStyling = false }) =>
	status && status !== 'closed' ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${LiveBlogModifiers[status]}`}>
			{status === 'comingsoon' && <span className="o-teaser__timestamp-prefix">{` Coming Soon `}</span>}
			{status === 'inprogress' && (
				<span
					className={`o-labels-indicator o-labels-indicator--live ${
						allowLiveTeaserStyling ? null : 'o-labels-indicator--badge'
					}`}
				>
					<span className="o-labels-indicator__status">{` Live `}</span>
				</span>
			)}
		</div>
	) : null
