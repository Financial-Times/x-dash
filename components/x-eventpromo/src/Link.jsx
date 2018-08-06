import { h } from '@financial-times/x-engine';

const Link = ({url, attrs = {}, children}) => {
	return (
		<a href={url} {...attrs}>{children}</a>
	);
};

export default Link;
