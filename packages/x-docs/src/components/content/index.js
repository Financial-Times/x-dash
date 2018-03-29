import React, {Fragment} from 'react';
import styles from './content.module.scss';
import c from 'classnames';

export default ({className, ...props}) => (
	<article {...props} className={c('o-techdocs-content', styles.content, className)} />
);
