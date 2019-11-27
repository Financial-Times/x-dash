import { h } from '@financial-times/x-engine';
import Title from './Title';

import styles from './MobileShareButtons.scss';
const containerClassNames = [
	styles.container
].join(' ');

const buttonClassNames = [
	styles.button
].join(' ');

const whatsappButtonClassNames = [
	buttonClassNames,
	styles.whatsapp
].join(' ');

const facebookClassNames = [
	styles.facebook
].join(' ');

const twitterClassNames = [
	styles.twitter
].join(' ');

const linkedinClassNames = [
	styles.linkedin
].join(' ');

const whatsappClassNames = [
	styles.whatsapp
].join(' ');

export default ({ mobileShareLinks }) => (
	<div className={ containerClassNames }>
		<Title title={ 'Share on Social' }/>
		<div className={ styles["container-inner"] }>
			<span className={ buttonClassNames } data-share="facebook">
				<a className={ facebookClassNames } rel="noopener" href={ mobileShareLinks.facebook } data-trackable="facebook">
					Facebook <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ buttonClassNames } data-share="twitter">
				<a className={ twitterClassNames } rel="noopener" href={ mobileShareLinks.twitter } data-trackable="twitter">
					Twitter <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ buttonClassNames } data-share="linkedin">
				<a className={ linkedinClassNames } rel="noopener" href={ mobileShareLinks.linkedin } data-trackable="linkedin">
					LinkedIn <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ buttonClassNames } data-share="whatsapp">
				<a className={ whatsappClassNames } rel="noopener" href={ mobileShareLinks.whatsapp } data-trackable="whatsapp">
					Whatsapp <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
		</div>
	</div>
);
