import { h } from '@financial-times/x-engine';
import styles from './styles/main.scss';

const Button = ({
	conceptId,
	followPlusDigestEmail,
	isSelected,
	extraButtonClasses,
	variant,
	alternateText,
	buttonText,
	name,
	...props
}) => (
	<button
		data-alternate-text={ isSelected ? `Add ${name} to MyFT` : `Remove ${name} to MyFT` }
		aria-label={ isSelected ? `Remove ${name} to MyFT` : `Add ${name} to MyFT` }
		title={ isSelected ? `Remove ${name} to MyFT` : `Add ${name} to MyFT` }
		data-alternate-label={ isSelected ? `Add ${name} to MyFT` : `Remove ${name} to MyFT` }
		aria-pressed={ isSelected ? 'true' : 'false' }
		className={ `${extraButtonClasses ? extraButtonClasses : ''}
				${styles['n-myft-follow-button']}
				${variant ? ` n-myft-follow-button--${variant}` : ''}` }
		data-concept-id={conceptId}
		data-trackable-context-messaging={
			followPlusDigestEmail ? 'add-to-myft-plus-digest-button' : null
		}
		data-trackable="follow"
		type="submit"
		{ ...props }>
		{ isSelected ? alternateText : buttonText }
	</button>
);

export default Button;
