import { h } from '@financial-times/x-engine'
import Container from './Container'
import Content from './Content'
import CustomSlot from './CustomSlot'
import Byline from './Byline'
import Headshot from './Headshot'
import Image from './Image'
import Meta from './Meta'
import RelatedLinks from './RelatedLinks'
import Status from './Status'
import Standfirst from './Standfirst'
import Title from './Title'
import Video from './Video'
import PromotionalContent from './PromotionaContent'
import { media } from './concerns/rules'
import presets from './concerns/presets'

const Teaser = (props) => (
	<Container {...props}>
		<Content>
			{props.showMeta ? <Meta {...props} /> : null}
			{media(props) === 'video' ? <Video {...props} /> : null}
			{props.showTitle ? <Title {...props} /> : null}
			{props.showStandfirst ? <Standfirst {...props} /> : null}
			{props.showByline ? <Byline {...props} /> : null}
			<Status {...props} />
			{props.showCustomSlot ? <CustomSlot {...props} /> : null}
			{
				/* Headshot is a legacy element.
				The Byline component already includes a headshot.
				Only render the Headshot when the media rule `headshot` is true,
				which means `showByline` is falsy. */
				media(props) === 'headshot' ? <Headshot {...props} /> : null
			}
		</Content>
		{media(props) === 'promotionalContent' ? <PromotionalContent {...props} /> : null}
		{media(props) === 'image' ? <Image {...props} /> : null}
		{props.showRelatedLinks ? <RelatedLinks {...props} /> : null}
	</Container>
)

export {
	Container,
	Content,
	CustomSlot,
	Headshot,
	Image,
	Meta,
	Byline,
	RelatedLinks,
	Standfirst,
	Status,
	Teaser,
	Title,
	Video,
	presets
}
