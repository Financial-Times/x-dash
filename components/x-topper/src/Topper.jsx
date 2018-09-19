import c from 'classnames';
import { h } from '@financial-times/x-engine';
import PropTypes from 'proptypes'
import { modifiers } from './concerns/modifiers'
import { createViewModel } from './concerns/view-model'

export const TagPropType = {
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	type: PropTypes.oneOf([ 'TOPIC', 'BRAND', 'GENRE' ]).isRequired,
	prefLabel: PropTypes.string.isRequired
}

Topper.propTypes = {
	theme: PropTypes.string,
	layout: PropTypes.string,
	headline: PropTypes.string,
	mainLink: PropTypes.shape(TagPropType),
	standfirst: PropTypes.string,
	prefixLink: PropTypes.shape(TagPropType),
	columnistUrl: PropTypes.string,
	columnistName: PropTypes.string,
	headshotImageUrl: PropTypes.string,
	modifiers: PropTypes.arrayOf(PropTypes.func),
	leadImages: PropTypes.arrayOf(PropTypes.shape({
		width: PropTypes.number.isRequired,
		description: PropTypes.string,
		aspectRatio: PropTypes.number,
		title: PropTypes.string,
		type: PropTypes.oneOf(['square', 'wide', 'standard']).isRequired,
		url: PropTypes.string.isRequired,
		height: PropTypes.number,
		ratio: PropTypes.number
	}))
}

Topper.defaultProps = { modifiers }

function Topper (props) {
	const m = createViewModel(props)
	return (
		<div className={c({
			'o-topper': true,
			'o-topper--basic': m.wrapper.mods.basic,
			'o-topper--opinion': m.wrapper.mods.opinion,
			'o-topper--centered': m.wrapper.mods.centered,
			'o-topper--color-paper': m.wrapper.mods.colorPaper,
			'o-topper--has-headshot': m.wrapper.mods.hasHeadshot,
			'o-topper--split-text-left': m.wrapper.mods.splitTextLeft,
			'o-topper--split-text-center': m.wrapper.mods.splitTextCenter,
			'o-topper--full-bleed-offset': m.wrapper.mods.fullBleedOffset,
			'o-topper--full-bleed-image-left': m.wrapper.mods.fullBleedImageLeft,

		})}>
			<div className="o-topper__content">
				{m.tags.show && (
					<div className="o-topper__tags">
						{m.tags.entries.map((tag) =>
							<a key={tag.id}
								href={tag.url}
								className={c({
									'o-topper__brand': tag.mods.brand,
									'o-topper__topic': tag.mods.topic,
									'o-topper__genre': tag.mods.genre
								})}>
								{tag.text}
							</a>
						)}
					</div>
				)}
				{m.headline.show &&
					<h1 data-trackable="header"
						className={c({
						'o-topper__headline': true,
						'o-topper__headline--large': m.headline.mods.large
					})}>
						{m.headline.text}
					</h1>
				}
				{m.standfirst.show && <div className="o-topper__standfirst">{m.standfirst.text}</div>}
				{m.columnist.show &&
					<div className="o-topper__columnist">
						<a className="o-topper__columnist-name" href={m.columnist.url}>{m.columnist.name}</a>
					</div>
				}
				{m.headshot.show &&
					<div className="o-topper__headshot">
						<img className="o-topper__headshot-image" src={m.headshot.image.url} role="presentation" />
					</div>
				}
				{m.visual.show &&
					<figure className="o-topper__visual">
						<picture className="o-topper__picture">
							{m.visual.imageSources.map((source, i) => (
								<source key={i} media={source.media} srcSet={source.srcSet} />
							))}
							<img alt={m.visual.image.alt} className="o-topper__image" src={m.visual.image.src} />
						</picture>
						{m.visual.credit.show && <figcaption className="o-topper__image-credit">{m.visual.credit.text}</figcaption>}
					</figure>
				}
			</div>
			{m.background.show && <div className="o-topper__background"></div>}
		</div>
	)
}

export {
	Topper,
	modifiers
};

// TODO: Add PropTypes removal to babel config
// TODO: Should the leadImages description or title be used for the image alt?
// TODO: See if there are more image types other than `square`, `wide` and `standard`
// TODO: Confirm what the tag types are. Currently you have them listed as `TOPIC`, `BRAND`, `GENRE`
