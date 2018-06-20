import { h } from '@financial-times/x-engine';
import buttonStyles from './Button.css';
import classNames from 'classnames';

export const Button = ({children, large, danger}) => <button
	className={classNames(
		buttonStyles.button,
		{
			[buttonStyles.large]: large,
			[buttonStyles.danger]: danger,
		}
	)}
>{children}</button>;
