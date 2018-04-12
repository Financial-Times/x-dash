const h = require('@financial-times/x-engine');

const BaseLink = ({url, title, attrs, children}) => <a href={url} title={title} {...attrs}>
	{children}
</a>;

module.exports = ({ elementOverrides = {}, ...props }) => {
	if(!props.url) {
		return <span>{props.children}</span>;
	}

	const Link = elementOverrides.Link || BaseLink;
	return <Link {...props} />
};
