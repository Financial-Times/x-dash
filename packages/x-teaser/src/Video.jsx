const h = require('@financial-times/x-engine');
const Image = require('./Image');

// To prevent React from touching the DOM after mounting… return an empty <div />
// <https://reactjs.org/docs/integrating-with-other-libraries.html>
const OVideo = (props) => (
	<div className="o-teaser__image-container js-image-container">
		<div
			className="o-video"
			data-o-component="o-video"
			data-o-video-id={props.id}
			data-o-video-autorender="true"
			data-o-video-playsinline="true"
			data-o-video-placeholder="true"
			data-o-video-placeholder-info="[]"
			data-o-video-placeholder-hint="Play video" />
	</div>
);

module.exports = (props) => (
	<div className="o-teaser__video">
		<div className="o--if-js">
			<OVideo {...props} />
		</div>
		<div className="o--if-no-js">
			<Image {...props} />
		</div>
	</div>
);
