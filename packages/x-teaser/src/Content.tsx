import { SFC } from 'react';

const Content: SFC<{}> = ({ children = [] }) => (
	<div className="o-teaser__content">{children}</div>
);

export default Content;
