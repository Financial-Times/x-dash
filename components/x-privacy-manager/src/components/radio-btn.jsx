import { h } from '@financial-times/x-engine'

/**
 * @param {{
 *   name: string,
 *   type: "allow" | "block",
 *   checked: boolean,
 *   trackingKeys: XPrivacyManager.TrackingKeys,
 *   onChange: (value: boolean) => void,
 * }} args
 *
 * @returns {JSX.Element}
 */
export function RadioBtn({ name, type, checked, trackingKeys, buttonText, onChange }) {
	const value = type === 'allow'
	const id = `${name}-${value}`
	const trackingId = trackingKeys[`advertising-toggle-${type}`]

	return (
		<div className="x-privacy-manager-radio-button">
			<input
				className="x-privacy-manager-radio-button__input"
				id={id}
				type="radio"
				name={name}
				value={value.toString()}
				checked={checked}
				data-trackable={trackingId}
				onChange={() => onChange(value)}
			/>
			<label htmlFor={id} className="x-privacy-manager-label">
				<span className="x-privacy-manager-label__text">
					<strong>{buttonText[type].label}</strong>
					<span>{buttonText[type].text}</span>
				</span>

				<svg
					className="x-privacy-manager-label__icon"
					viewBox="0 0 36 36"
					aria-hidden="true"
					focusable="false"
				>
					<circle className="x-privacy-manager-label__icon-outer" cx="18" cy="18" r="16" />
					<circle className="x-privacy-manager-label__icon-inner" cx="18" cy="18" r="8" />
				</svg>
			</label>
		</div>
	)
}
