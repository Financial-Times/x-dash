import { h } from '@financial-times/x-engine'

const sameLabel = (context, label) => {
	return label && context && context.parentLabel && label === context.parentLabel
}

const getDisplayLink = (streamLinks, context) => {
	if (!Array.isArray(streamLinks) || streamLinks.length === 0) {
		return []
	}

	const primaryLabel = streamLinks[0]?.at(0)
	const shouldUseAltLink = sameLabel(context, primaryLabel)
	const link = shouldUseAltLink ? streamLinks[1] : streamLinks[0]

	return Array.isArray(link) ? link : []
}

export default ({ streamLinks = [], metaSuffixText, context }) => {
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText)
	const [tagLabel, tagUrl] = getDisplayLink(streamLinks, context)
	const shouldRender = (tagLabel && tagUrl) || showSuffixText

	return shouldRender ? (
		<div className="o-teaser__meta">
			{tagLabel && tagUrl ? (
				<a
					className="o-teaser__tag"
					data-trackable="teaser-tag"
					data-trackable-context-story-link="teaser-tag"
					href={tagUrl}
					aria-label={`Category: ${tagLabel}`}
				>
					{tagLabel}
				</a>
			) : null}
			{showSuffixText ? <span className="o-teaser__tag-suffix">{metaSuffixText}</span> : null}
		</div>
	) : null
}
