import { h } from '@financial-times/x-engine'
import sameLabel from './concerns/same-label'

const isLegacyMode = (metaLinks) => !Array.isArray(metaLinks)

const getDisplayLink = ({ metaLink, metaAltLink, metaLinks, context }) => {
	if (!isLegacyMode(metaLinks)) {
		if (metaLinks.length === 0) {
			return []
		}
		const primaryLabel = metaLinks.at(0)?.at(0)
		const shouldUseAltLink = sameLabel(context, primaryLabel)
		const displayLink = shouldUseAltLink ? metaLinks[1] : metaLinks[0]

		return Array.isArray(displayLink) ? displayLink : []
	}

	// Legacy mode: retrieve the displayLink from `metaLink`/`metaAltLink`.
	if (metaLink && typeof metaLink === 'object') {
		const primaryLabel = metaLink.prefLabel
		const shouldUseAltLink = sameLabel(context, primaryLabel)
		const displayLink = shouldUseAltLink ? metaAltLink : metaLink
		const label = displayLink?.prefLabel
		const url = displayLink?.relativeUrl || displayLink?.url

		return [label, url]
	}

	return []
}

export default ({ metaPrefixText, metaLink, metaAltLink, metaSuffixText, metaLinks, context }) => {
	// `metaPrefixText` is legacy-only.
	const showPrefixText = isLegacyMode(metaLinks) && metaPrefixText && !sameLabel(context, metaPrefixText)
	const showSuffixText = metaSuffixText && !sameLabel(context, metaSuffixText)
	const [tagLabel, tagUrl] = getDisplayLink({
		metaLink,
		metaAltLink,
		metaLinks,
		context
	})
	const shouldRender = showPrefixText || (tagLabel && tagUrl) || showSuffixText

	return shouldRender ? (
		<div className="o-teaser__meta">
			{showPrefixText ? <span className="o-teaser__tag-prefix">{metaPrefixText}</span> : null}
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
