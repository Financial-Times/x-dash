import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import BasicLayout from './basic';
import Header from '../components/header';
import Footer from '../components/footer';

import styles from './splash/splash.module.scss';

const TemplateWrapper = ({children}) => <BasicLayout>{() =>
	<Fragment>
		<Helmet
			bodyAttributes={{
				class: styles.splashBody,
			}}
		/>

		<Header splash />

		{children()}

		<Footer splash />
	</Fragment>
}</BasicLayout>;

TemplateWrapper.propTypes = {
	children: PropTypes.func,
};

export default TemplateWrapper;
