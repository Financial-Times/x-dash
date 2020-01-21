import { h } from '@financial-times/x-engine';
import Title from './Title';

import styles from './MobileShareButtons.scss';

export default ({ mobileShareLinks }) => (
	<div className={ styles.container }>
		<Title title={ 'Share on Social' }/>
		<div className={ styles["container-inner"] }>
			<span className={ styles.button } data-share="facebook">
				<a className={ styles.facebook } rel="noopener" href={ mobileShareLinks.facebook } data-trackable="facebook">
					Facebook <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ styles.button } data-share="twitter">
				<a className={ styles.twitter } rel="noopener" href={ mobileShareLinks.twitter } data-trackable="twitter">
					Twitter <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ styles.button } data-share="linkedin">
				<a className={ styles.linkedin } rel="noopener" href={ mobileShareLinks.linkedin } data-trackable="linkedin">
					LinkedIn <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
			<span className={ styles.button } data-share="whatsapp">
				<a className={ styles.whatsapp } rel="noopener" href={ mobileShareLinks.whatsapp } data-trackable="whatsapp">
					Whatsapp <span className={ styles["hidden-button-text"] }>(opens new window)</span>
				</a>
			</span>
		</div>
	</div>
);
