const h = require('@financial-times/x-engine');

const BaseLink = ({url, attrs, children}) => <a href={url} {...attrs}>
	{children}
</a>;

module.exports = ({ elementOverrides = {}, ...props }) => {
	if(!url) {
		return <span>{props.children}</span>;
	}

	const Link = elementOverrides.Link || BaseLink;
	return <Link {...props} />
};
