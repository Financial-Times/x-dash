import { h } from '@financial-times/x-engine';
import styles from './GiftArticle.css';

const confirmationClassNames = [
	'o-message',
	'o-message--alert-bleed',
	'o-message--success',
	styles['copy-confirmation']
].join(' ');

export default ({ hideCopyConfirmation }) => (
	<div className={ confirmationClassNames }>
		<div className="o-message__container">

			<div className="o-message__content">
				<p className="o-message__content-main">
					<span className="o-message__content-highlight">The link has been copied to your clipboard</span>
				</p>
			</div>

			<button className="o-message__close" aria-label="close" title="Close" onClick={ hideCopyConfirmation }></button>

		</div>
	</div>
);
