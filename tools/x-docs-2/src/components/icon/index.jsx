import React from 'react';

const slate = '#262A33';

const domain = 'https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1';

const getIconUrl = ({ icon, tint }) => {
	return `${domain}:${icon}?tint=${encodeURIComponent(tint)}&source=x-dash`
};

export default ({ icon, tint = slate, ...props }) => (
	<img src={getIconUrl({ icon, tint })} alt={icon} {...props} />
);
