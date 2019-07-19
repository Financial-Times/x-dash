import React from 'react';

const linkProps = {
	rel: 'noopener noreferrer',
	target: '_blank'
};

export default () => (
	<footer className="site-footer" role="contentinfo">
		<div className="site-footer__legal-links">
			<a href="http://help.ft.com/help/legal-privacy/cookies/" {...linkProps}>
				Cookies
			</a>
			<a href="http://help.ft.com/help/legal-privacy/copyright/copyright-policy/" {...linkProps}>
				Copyright
			</a>
			<a href="http://help.ft.com/help/legal-privacy/privacy/" {...linkProps}>
				Privacy
			</a>
			<a href="http://help.ft.com/help/legal-privacy/terms-conditions" {...linkProps}>
				Terms &amp; Conditions
			</a>
		</div>
		<div className="site-footer__related-links">
			<a href="https://github.com/financial-times/x-dash" {...linkProps}>
				x-dash on GitHub
			</a>
			<a href="https://slack.com/messages/x/" {...linkProps}>
				x-dash on Slack
			</a>
		</div>
		<p className="site-footer__small-print">
			<small>
				© THE FINANCIAL TIMES LTD 2018. FT and 'Financial Times' are trademarks of The Financial
				Times Ltd
			</small>
		</p>
	</footer>
);
