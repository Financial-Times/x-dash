import { h } from '@financial-times/x-engine'
import Link from './Link'

export default ({ title, altTitle, headlineTesting, relativeUrl, url, ...props }) => {
	const displayTitle = headlineTesting && altTitle ? altTitle : title
	const displayUrl = relativeUrl || url
	let ariaLabel
	if (props.type === 'video') {
		ariaLabel = `Watch video ${displayTitle}`
	} else if (props.type === 'audio') {
		ariaLabel = `Listen to podcast ${displayTitle}`
	}

	return (
		<div className="o-teaser__heading">
			<Link
				{...props}
				url={displayUrl}
				attrs={{
					'data-trackable': 'heading-link',
					'data-trackable-context-story-link': 'heading-link',
					className: 'js-teaser-heading-link',
					'aria-label': ariaLabel
				}}
			>
				{displayTitle}
			</Link>
		</div>
	)
}
