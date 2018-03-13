import { SFC } from 'react';
import { TeaserProps } from './types/Props';

// JSX factory function
declare const h: any;

const Content: SFC<{}> = ({ children = [] }) => (
	<div className="o-teaser__content">{children}</div>
);

export default Content;
