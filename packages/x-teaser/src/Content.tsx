import { SFC } from 'react';
import h from '@financial-times/x-engine';

const Content: SFC<{}> = ({ children = [] }) => (
	<div className="o-teaser__content">{children}</div>
);

export default Content;
