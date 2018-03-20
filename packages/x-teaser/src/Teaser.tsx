import { TeaserProps } from './types/Props';
import { h, Component } from '@financial-times/x-engine';
import Concepts from './Concepts';
import Container from './Container';
import Content from './Content';
import Headshot from './Headshot';
import Image from './Image';
import DateTimeStatus from './DateTimeStatus';
import Standfirst from './Standfirst';
import Title from './Title';

const DefaultFeatures = {
	showConcept: true,
	showTitle: true,
	showStandfirst: true,
	showDateTimeStatus: true,
	showImage: true,
	showHeadshot: false
};

const DefaultOptions = {
	useTitleVariant: false,
	useStandfirstVariant: false,
	useImageVariant: false,
	useRelativeTime: false
};

const Teaser: Component<TeaserProps> = (props) => {
	props = { ...DefaultFeatures, ...DefaultOptions, ...props };

	return (
		<Container {...props}>
			<Content>
				{props.showConcept ? <Concepts {...props} /> : null}
				{props.showTitle ? <Title {...props} /> : null}
				{props.showStandfirst ? <Standfirst {...props} /> : null}
				{props.showDateTimeStatus ? <DateTimeStatus {...props} /> : null}
				{props.showHeadshot ? <Headshot {...props} /> : null}
			</Content>
			{props.showImage ? <Image {...props} /> : null}
		</Container>
	);
};

export {
	DefaultFeatures,
	Concepts,
	Container,
	Content,
	Headshot,
	Image,
	Standfirst,
	DateTimeStatus,
	Teaser,
	Title
};
