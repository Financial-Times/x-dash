const h = require('@financial-times/x-engine');
const Meta = require('./Meta');
const Container = require('./Container');
const Content = require('./Content');
const Headshot = require('./Headshot');
const Image = require('./Image');
const Status = require('./Status');
const Standfirst = require('./Standfirst');
const Title = require('./Title');

const DefaultFeatures = {
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	showHeadshot: false
};

const DefaultOptions = {
	useTitleVariant: false,
	useStandfirstVariant: false,
	useRelativeTime: false,
	useAlternativeConcept: false,
	imageSize: 'Small',
	modifiers: []
};

const Teaser = (props) => {
	props = { ...DefaultFeatures, ...DefaultOptions, ...props };

	return (
		<Container {...props}>
			<Content>
				{props.showMeta ? <Meta {...props} /> : null}
				{props.showTitle ? <Title {...props} /> : null}
				{props.showStandfirst ? <Standfirst {...props} /> : null}
				{props.showStatus ? <Status {...props} /> : null}
				{props.showHeadshot ? <Headshot {...props} /> : null}
			</Content>
			{props.showImage ? <Image {...props} /> : null}
		</Container>
	);
};

module.exports = {
	DefaultFeatures,
	Container,
	Content,
	Headshot,
	Image,
	Meta,
	Standfirst,
	Status,
	Teaser,
	Title
};
