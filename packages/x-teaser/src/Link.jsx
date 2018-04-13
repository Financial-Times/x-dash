const h = require('@financial-times/x-engine');

const BaseLink = ({url, title, attrs, children}) => <a href={url} title={title} {...attrs}>
	{children}
</a>;

module.exports = ({ customElements = {}, ...props }) => {
	if(!props.url) {
		return <span>{props.children}</span>;
	}

	const Link = customElements.Link || BaseLink;
	return <Link {...props} />
};
