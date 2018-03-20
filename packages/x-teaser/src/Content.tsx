import { h, Component } from '@financial-times/x-engine';

const Content: Component<{}> = ({ children = [] }) => (
	<div className="o-teaser__content">{children}</div>
);

export default Content;
