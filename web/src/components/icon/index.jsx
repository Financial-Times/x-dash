import React from 'react';

const slate = '#262A33';

const domain = 'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1';

export default ({ icon, tint = slate, ...props }) => {
	const iconUrl = `${domain}:${icon}?tint=${encodeURIComponent(tint)}&source=x-dash`;
	return <img src={iconUrl} alt={icon} {...props} />
};
