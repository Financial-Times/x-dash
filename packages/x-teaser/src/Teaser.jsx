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
const Video = require('./Video');
const { media } = require('./concerns/rules');

const Teaser = (props) => (
	<Container {...props}>
		<Content>
			{props.showMeta ? <Meta {...props} /> : null}
			{media(props) === 'video' ? <Video {...props} /> : null}
			{props.showTitle ? <Title {...props} /> : null}
			{props.showStandfirst ? <Standfirst {...props} /> : null}
			{props.showStatus ? <Status {...props} /> : null}
			{props.showActions ? <Actions {...props} /> : null}
			{media(props) === 'headshot' ? <Headshot {...props} /> : null}
		</Content>
		{media(props) === 'image' ? <Image {...props} /> : null}
		{props.showRelated ? <Related {...props} /> : null}
	</Container>
);

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
	Title,
	Video
};

module.exports.presets = require('./concerns/presets');
