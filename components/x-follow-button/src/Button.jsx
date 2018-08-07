import { h } from '@financial-times/x-engine';
import styles from './styles/main.scss';

const Button = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
	variant,
	altButtonText,
	buttonText,
	name,
	...props
}) => (
	<button
		data-alternate-text={ isSelected ? `Add ${name} to MyFT` : `Remove ${name} from MyFT` }
		aria-label={ isSelected ? `Remove ${name} from MyFT` : `Add ${name} to MyFT` }
		title={ isSelected ? `Remove ${name} from MyFT` : `Add ${name} to MyFT` }
		data-alternate-label={ isSelected ? `Add ${name} to MyFT` : `Remove ${name} from MyFT` }
		aria-pressed={ isSelected ? 'true' : 'false' }
		className={ `${styles['button']} ${styles[`button--${variant}`]}` }
		data-concept-id={conceptId}
		data-trackable-context-messaging={
			followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null
		}
		data-trackable="follow"
		type="submit"
		{ ...props }>
		{ isSelected ? altButtonText : buttonText }
	</button>
);

export default Button;
