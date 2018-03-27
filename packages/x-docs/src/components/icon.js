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

export default ({icon, tint = 'black', ...props}) => <img
	src={getIconUrl({icon, tint})}
	alt={icon}
	{...props}
/>;
