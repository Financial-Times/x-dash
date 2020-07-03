import { h } from '@financial-times/x-engine';

import s from './radio-btn.scss';

export function RadioBtn({ value, trackingId, checked, onChange, children }) {
	const id = `ccpa-${value}`;

	return (
		<div className={s.control}>
			<input
				className={s.input}
				id={id}
				type="radio"
				name="consent"
				value={value}
				checked={checked}
				onChange={onChange}
				data-trackable={trackingId}
			/>
			<label htmlFor={id} className={s.label}>
				<span className={s.label__text}>
					{children}
				</span>

				<svg className={s.label__icon} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
					<circle className={s.label__icon__outer} cx="18" cy="18" r="16" />
					<circle className={s.label__icon__inner} cx="18" cy="18" r="8" />
				</svg>
			</label>
		</div>
	);
}
