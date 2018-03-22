const h = require('@financial-times/x-engine');

const LiveBlogLabels = {
	inprogress: 'Live',
	comingsoon: 'Coming Soon',
	closed: ''
};

const LiveBlogModifiers = {
	inprogress: 'live',
	comingsoon: 'pending',
	closed: 'closed'
};

module.exports = ({ status }) =>
	status ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${LiveBlogModifiers[status]}`}>
			<span className="o-teaser__timestamp-prefix">{LiveBlogLabels[status]}</span>
		</div>
	) : null;
