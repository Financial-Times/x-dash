import { h } from '@financial-times/x-engine'
import { ImageSizes } from './concerns/constants'
import imageService from './concerns/image-service'
import Link from './Link'

const Headshot = ({ headshot, bylineLabel }) =>
	headshot ? (
		<img
			className="o-teaser__byline-headshot"
			width={ImageSizes.BylineHeadshot}
			height={ImageSizes.BylineHeadshot}
			alt={`${bylineLabel} headshot`}
			aria-hidden="true"
			src={imageService(headshot, ImageSizes.BylineHeadshot, {})}
			srcSet={`
				${imageService(headshot, ImageSizes.BylineHeadshot, {})} 1x,
				${imageService(headshot, ImageSizes.BylineHeadshot * 2, {})} 2x
			`}
		/>
	) : null

const BylineLink = ({ text, url, headshot, showBylineHeadshot }) => (
	<Link
		url={url}
		attrs={{
			'data-trackable': 'byline-link',
			className: 'o-teaser__byline-link'
		}}
	>
		{showBylineHeadshot && <Headshot headshot={headshot} bylineLabel={text} />}
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
