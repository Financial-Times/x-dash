const h = require('@financial-times/x-engine');
const Concepts = require('./Concepts');
const Container = require('./Container');
const Content = require('./Content');
const Headshot = require('./Headshot');
const Image = require('./Image');
const DateTimeStatus = require('./DateTimeStatus');
const Standfirst = require('./Standfirst');
const Title = require('./Title');

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
	useRelativeTime: false,
	useAlternativeConcept: false,
	imageSize: 'Small'
};

const Teaser = (props) => {
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

module.exports = {
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
