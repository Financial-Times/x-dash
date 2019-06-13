import { h } from '@financial-times/x-engine';
import Container from './Container';
import Content from './Content';
import CustomSlot from './CustomSlot';
import Headshot from './Headshot';
import Image from './Image';
import Meta from './Meta';
import RelatedLinks from './RelatedLinks';
import Status from './Status';
import Standfirst from './Standfirst';
import Title from './Title';
import Video from './Video';
import { media } from './concerns/rules';
import presets from './concerns/presets';

// v2
import HeroWithImage from './v2/layouts/hero/HeroWithImage';
import HeroNoImage from './v2/layouts/hero/HeroNoImage';
import Vertical from './v2/layouts/vertical/Vertical';
import VerticalRecommended from './v2/layouts/vertical/VerticalRecommended';
import Horizontal from './v2/layouts/horizontal/Horizontal';
import Recommended from './v2/layouts/horizontal/Recommended';
import MoreFrom from './v2/layouts/horizontal/MoreFrom';
import Lead from './v2/layouts/horizontal/Lead';

const Teaser = (props) => (
	<Container {...props}>
		<Content>
			{props.showMeta ? <Meta {...props} /> : null}
			{media(props) === 'video' ? <Video {...props} /> : null}
			{props.showTitle ? <Title {...props} /> : null}
			{props.showStandfirst ? <Standfirst {...props} /> : null}
			{props.showStatus ? <Status {...props} /> : null}
			{props.showCustomSlot ? <CustomSlot {...props} /> : null}
			{media(props) === 'headshot' ? <Headshot {...props} /> : null}
		</Content>
		{media(props) === 'image' ? <Image {...props} /> : null}
		{props.showRelatedLinks ? <RelatedLinks {...props} /> : null}
	</Container>
);

export {
	Container,
	Content,
	CustomSlot,
	Headshot,
	Image,
	Meta,
	RelatedLinks,
	Standfirst,
	Status,
	Teaser,
	Title,
	Video,
	presets,

	// v2
	HeroWithImage,
	HeroNoImage,
	Vertical,
	Horizontal,
	Lead,
	Recommended,
	VerticalRecommended,
	MoreFrom,
};
