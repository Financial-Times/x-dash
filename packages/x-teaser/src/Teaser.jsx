const h = require('@financial-times/x-engine');
const Actions = require('./Actions');
const Container = require('./Container');
const Content = require('./Content');
const Headshot = require('./Headshot');
const Image = require('./Image');
const Meta = require('./Meta');
const Related = require('./Related');
const Status = require('./Status');
const Standfirst = require('./Standfirst');
const Title = require('./Title');



const DefaultFeatures = {
	showMeta: false,
	showTitle: true,
	showStandfirst: false,
	showStatus: false,
	showActions: false,
	showHeadshot: false,
	showImage: false,
	showRelated: false
};

const DefaultOptions = {
	useTitleVariant: false,
	useStandfirstVariant: false,
	useRelativeTime: false,
	useAlternativeConcept: false,
	imageSize: 'Small',
	modifiers: [],
	indicators: {}
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
				{props.showActions ? <Actions {...props} /> : null}
				{props.showHeadshot ? <Headshot {...props} /> : null}
			</Content>
			{props.showImage ? <Image {...props} /> : null}
			{props.showRelated ? <Related {...props} /> : null}
		</Container>
	);
};

module.exports = {
	Actions,
	Container,
	Content,
	Headshot,
	Image,
	Meta,
	Related,
	Standfirst,
	Status,
	Teaser,
	Title
};

module.exports.presets = require('./concerns/presets');
