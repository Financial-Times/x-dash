import { h } from '@financial-times/x-engine';
import Title from './Title';

import styles from './MobileShareButtons.scss';
const containerClassNames = [
	'o-share',
	'o-share--inverse',
	styles.container
].join(' ');

const buttonClassNames = [
	'o-share__action',
	styles.button
].join(' ');

const whatsappButtonClassNames = [
	buttonClassNames,
	'o-share__action--whatsapp'
].join(' ');

const facebookClassNames = [
	'o-share__icon',
	'o-share__icon--facebook',
	styles.facebook
].join(' ');

const twitterClassNames = [
	'o-share__icon',
	'o-share__icon--twitter',
	styles.twitter
].join(' ');

const linkedinClassNames = [
	'o-share__icon',
	'o-share__icon--linkedin',
	styles.linkedin
].join(' ');

const whatsappClassNames = [
	'o-share__icon',
	'o-share__icon--whatsapp',
	styles.whatsapp
].join(' ');

export default ({ mobileShareLinks }) => (
	<div className={ containerClassNames } data-o-component="o-share">
		<Title title={ 'Share on Social' }/>
		<ul>
			<li className={ buttonClassNames } data-share="facebook">
				<a className={ facebookClassNames } rel="noopener" href={ mobileShareLinks.facebook } data-trackable="facebook">
					Facebook <span className="o-share__text">(opens new window)</span>
				</a>
			</li>
			<li className={ buttonClassNames } data-share="twitter">
				<a className={ twitterClassNames } rel="noopener" href={ mobileShareLinks.twitter } data-trackable="twitter">
					Twitter <span className="o-share__text">(opens new window)</span>
				</a>
			</li>
			<li className={ buttonClassNames } data-share="linkedin">
				<a className={ linkedinClassNames } rel="noopener" href={ mobileShareLinks.linkedin } data-trackable="linkedin">
					LinkedIn <span className="o-share__text">(opens new window)</span>
				</a>
			</li>
			<li className={ whatsappButtonClassNames } data-share="whatsapp">
				<a className={ whatsappClassNames } rel="noopener" href={ mobileShareLinks.whatsapp } data-trackable="whatsapp">
					Whatsapp <span className="o-share__text">(opens new window)</span>
				</a>
			</li>
		</ul>
	</div>
);
