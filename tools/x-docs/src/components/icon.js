import React from 'react';
import url from 'url';

const getIconUrl = ({icon, tint}) => url.format({
	protocol: 'https',
	host: 'www.ft.com',
	pathname: `__origami/service/image/v2/images/raw/fticon-v1:${icon}`,
	query: {
		source: 'x-dash-docs',
		tint
	}
});

//TODO: i'll take "what is o-colors" for $200 please Alex
const slate = '#262A33';

export default ({icon, tint = slate, ...props}) => <img
	src={getIconUrl({icon, tint})}
	alt={icon}
	{...props}
/>;
