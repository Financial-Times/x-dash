import { h } from '@financial-times/x-engine'
import { ImageSizes } from './concerns/constants'
import imageService from './concerns/image-service'
import Link from './Link'

const BylineLink = ({ text, url, headshot, showBylineHeadshot }) => (
	<Link
		url={url}
		attrs={{
			'data-trackable': 'byline-link',
			className: 'o-teaser__byline-link'
		}}
	>
		{showBylineHeadshot && headshot ? (
			<img
				width={ImageSizes.BylineHeadshot}
				height={ImageSizes.BylineHeadshot}
				alt=""
				loading="lazy"
				aria-hidden="true"
				onError={({ currentTarget }) => currentTarget?.remove()}
				src={imageService(headshot, ImageSizes.BylineHeadshot, {})}
				srcSet={`
					${imageService(headshot, ImageSizes.BylineHeadshot * 2, {})} 2x
				`}
			/>
		) : null}
		<span className="o-teaser__byline-link-label">{text}</span>
	</Link>
)

const BylineText = ({ text }) => (text ? <span className="o-teaser__byline-text">{text}</span> : null)

export default ({ byline, showBylineHeadshot }) =>
	Array.isArray(byline) && byline.length > 0 ? (
		<div className="o-teaser__byline">
			{byline.map(([text, url, headshot], index) =>
				text && url ? (
					<BylineLink
						key={`byline-link-${index}`}
						text={text}
						url={url}
						headshot={headshot}
						showBylineHeadshot={showBylineHeadshot}
					/>
				) : (
					<BylineText key={`byline-text-${index}`} text={text} />
				)
			)}
		</div>
	) : null
