import { h } from '@financial-times/x-engine'
import classNames from 'classnames'

export const Button = ({ large, danger }) => (
	<button
		className={classNames('button', {
			'button--large': large,
			'button--danger': danger
		})}
	>
		Click me!
	</button>
)
