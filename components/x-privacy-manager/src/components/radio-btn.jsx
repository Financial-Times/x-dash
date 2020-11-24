import { h } from '@financial-times/x-engine'

import s from './radio-btn.scss'

/**
 * @param {{
 *   name: string,
 *   type: "allow" | "block",
 *   checked: boolean,
 *   trackingKeys: Record<string, string>,
 *   onChange: () => void,
 *   children?: Element
 * }} args
 *
 * @returns {JSX.Element}
 */
export function RadioBtn({ name, type, checked, trackingKeys, buttonText, onChange }) {
	const value = type === 'allow'
	const id = `${name}-${value}`
	const trackingId = trackingKeys[`advertising-toggle-${type}`]

	return (
		<div className={s.control}>
			<input
				className={s.input}
				id={id}
				type="radio"
				name={name}
				value={value.toString()}
				checked={checked}
				data-trackable={trackingId}
				onChange={() => onChange(value)}
			/>
			<label htmlFor={id} className={s.label}>
				<span className={s.label__text}>
					<strong>{buttonText[type].label}</strong>
					<span>{buttonText[type].text}</span>
				</span>

				<svg className={s.label__icon} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
					<circle className={s.label__icon__outer} cx="18" cy="18" r="16" />
					<circle className={s.label__icon__inner} cx="18" cy="18" r="8" />
				</svg>
			</label>
		</div>
	)
}
