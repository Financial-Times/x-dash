import { h } from '@financial-times/x-engine'
import Timestamp from './Timestamp'

const FurtherReadingNews = ({ teaser, variant }) => {
	const tag = teaser.metaLink.prefLabel || 'News'

	return (
		<a className={`x-live-blog-post__recommended-further-reading ${variant}`} href={teaser.url}>
			<div className="o-teaser o-teaser--large" data-o-component="o-teaser">
				<div className="o-teaser__image-container">
					<img src={teaser.image.url} className="o-teaser__image" alt="" />
				</div>
				<div className="o-teaser__content">
					<div className="o-teaser__meta">
						<span href="#" className="o-teaser__tag">
							{tag}
						</span>
					</div>

					<h2 className="o-teaser__heading">
						<span href="#">{teaser.title}</span>
					</h2>

					<div className="o-teaser__timestamp">
						<Timestamp publishedTimestamp={teaser.publishedDate} />
					</div>
				</div>
			</div>
		</a>
	)
}

const FurtherReadingOpinion = ({ teaser, variant }) => {
	const tag = teaser.metaLink.prefLabel || 'Opinion'
	const author = 'Robert Shipley'

	return (
		<a className={`x-live-blog-post__recommended-further-reading ${variant}`} href={teaser.url}>
			<div
				className="o-teaser o-teaser--large o-teaser--opinion o-teaser--opinion-background"
				data-o-component="o-teaser"
			>
				<div className="o-teaser__image-container">
					<img src={teaser.image.url} className="o-teaser__image" alt="" />
				</div>
				<div className="o-teaser__content">
					<div className="o-teaser__meta">
						<span href="#" className="o-teaser__tag">
							{tag}
						</span>
						<span href="#" className="o-teaser__author">
							{author}
						</span>
					</div>

					<h2 className="o-teaser__heading">
						<span href="#">{teaser.title}</span>
					</h2>

					<div className="o-teaser__timestamp">
						<Timestamp publishedTimestamp={teaser.publishedDate} />
					</div>
				</div>
			</div>
		</a>
	)
}

const FurtherReading = ({ recommended, variant }) => {
	const isOpinion = recommended.metaLink.prefLabel === 'Opinion'
	const FurtherReadingComponent = isOpinion ? FurtherReadingOpinion : FurtherReadingNews

	return <>{recommended && <FurtherReadingComponent teaser={recommended} variant={variant} />}</>
}

export { FurtherReading }

export const teaserBuilder = (bodyHTML) => {
	let parser = new DOMParser()
	const doc = parser.parseFromString(bodyHTML, 'text/html')
	const recommendedElement = doc.querySelector('[data-trackable="recommended"]')
	const recommendedLink = recommendedElement?.querySelector('a')

	const teaser = {
		genre: 'Politics',
		url: recommendedLink.href,
		image:
			'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fa60ae24b-b87f-439c-bf1b-6e54946b4cf2.img?width=280&amp;source=o-teaser-demo',
		title: recommendedLink.innerText
	}

	recommendedElement.remove()
	const html = doc.body.innerHTML

	return {
		teaser,
		html
	}
}
