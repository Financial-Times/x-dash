import { h } from '@financial-times/x-engine';
import buttonStyles from './Button.css';
import classNames from 'classnames';

export const Button = ({large, danger}) => <button
	className={classNames(
		buttonStyles.button,
		{
			[buttonStyles.large]: large,
			[buttonStyles.danger]: danger,
		}
	)}
>Click me!</button>;
