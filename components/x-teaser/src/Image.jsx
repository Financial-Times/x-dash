import { h } from '@financial-times/x-engine'
import { ImageSizes } from './concerns/constants'
import imageService from './concerns/image-service'
import Link from './Link'

/**
 * Aspect Ratio
 * @param {{ width: Number, height: Number }} image
 * @returns {String|null}
 */
const aspectRatio = ({ width, height }) => {
	if (typeof width === 'number' && typeof height === 'number') {
		const ratio = (100 / width) * height
		return ratio.toFixed(4) + '%'
	}

	return null
}

const NormalImage = ({ src, alt }) => <img className="o-teaser__image" src={src} alt={alt} />

const LazyImage = ({ src, lazyLoad, alt }) => {
	const lazyClassName = typeof lazyLoad === 'string' ? lazyLoad : ''
	return <img className={`o-teaser__image ${lazyClassName}`} data-src={src} alt={alt} />
}

export default ({ relativeUrl, url, mainImage, imageSize, imageLazyLoad, imageHighestQuality, ...props }) => {
	if (!mainImage || (mainImage && !mainImage.url)) {
		return null
	}
	const displayUrl = relativeUrl || url
	const useImageService = !(mainImage.url.startsWith('data:') || mainImage.url.startsWith('blob:'))
	const options = imageSize === 'XXL' && imageHighestQuality ? { quality: 'highest' } : {}
	const imageSrc = useImageService
		? imageService(mainImage.url, ImageSizes[imageSize], options)
		: mainImage.url
	const alt = (mainImage.altText || '').trim()
	const ImageComponent = imageLazyLoad ? LazyImage : NormalImage

	return (
		<div className="o-teaser__image-container js-teaser-image-container">
			<Link
				{...props}
				url={displayUrl}
				attrs={{
					'data-trackable': 'image-link',
					tabIndex: '-1',
					'aria-hidden': 'true'
				}}
			>
				<div className="o-teaser__image-placeholder" style={{ paddingBottom: aspectRatio(mainImage) }}>
					<ImageComponent src={imageSrc} lazyLoad={imageLazyLoad} alt={alt} />
				</div>
			</Link>
		</div>
	)
}
