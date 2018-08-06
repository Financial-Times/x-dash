import { h } from '@financial-times/x-engine';

const Link = ({url, attrs = {}, children}) => {
	console.log('url', url);
	return (
		<a href={url} {...attrs}>{children}</a>
	);
};

export default Link;
