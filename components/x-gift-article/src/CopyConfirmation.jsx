import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.scss';

const confirmationClassNames = [
	styles['o-message'],
	styles['o-message--alert'],

	styles['o-message--success'],
	styles['copy-confirmation']
].join(' ');

export default ({ hideCopyConfirmation }) => (
	<div className={ confirmationClassNames }>
		<div className={ styles["o-message__container"] }>

			<div className={ styles["o-message__content"] }>
				<p className={ styles["o-message__content-main"]}>
					<span className={ styles["o-message__content-highlight"] }>The link has been copied to your clipboard</span>
				</p>
			</div>

			<button className={ styles["o-message__close"]} aria-label="close" title="Close" onClick={ hideCopyConfirmation }></button>

		</div>
	</div>
);
