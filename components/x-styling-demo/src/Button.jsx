import { h } from '@financial-times/x-engine';
import buttonStyles from './Button.css';

export const Button = ({large, danger}) => <button
	className={[
		buttonStyles.button,
		large && buttonStyles.large,
		danger && buttonStyles.danger,
	].filter(Boolean).join(' ')}
>Click me!</button>;
