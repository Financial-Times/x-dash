import { h } from '@financial-times/x-engine'
import s from './privacy-manager.scss'

/**
 * Provide a way to return to the referrer's homepage
 * Potentially a Specialist Title, FT.com or FT App
 *
 * @param {string} referrer
 */
function renderReferrerLink(referrer) {
	if (!referrer) return

	let url

	try {
		url = new URL(`https://${referrer}`)
	} catch (_) {
		// referrer cannot be parsed: omit link
		return
	}

	return (
		<a href={url.href} data-component="referrer-link" className="o-message__actions__secondary">
			Continue to homepage
		</a>
	)
}

function Message({ cls, children }) {
	return (
		<div className={cls} data-o-component="o-message">
			<div className="o-message__container">
				<div className="o-message__content ">
					<div className="o-message__content-main">{children}</div>
				</div>
			</div>
		</div>
	)
}

/**
 *
 * @param {{
 *   success: boolean
 *   referrer: string
 * }} props
 */
export function ResponseMessage({ success, referrer }) {
	const statusDict = {
		true: {
			cls: 'o-message--success',
			msg:
				'Your settings have been saved on this device. Please apply your preferences to all of the devices you use to access our Sites.'
		},
		false: {
			cls: 'o-message--error',
			msg: 'Your settings could not be saved. Please try again later.'
		}
	}

	const status = statusDict[success]
	const cls = `o-message o-message--alert ${status.cls}`

	return (
		<Message cls={cls}>
			{status.msg}&nbsp;{renderReferrerLink(referrer)}
		</Message>
	)
}

export function LoadingMessage() {
	const cls = 'o-message o-message--neutral'
	const spinnerCls = `o-loading o-loading--dark o-loading--small ${s['v-middle']}`

	return (
		<Message cls={cls}>
			<div className={spinnerCls}></div>
			<span className={s.loading}>Loading...</span>
		</Message>
	)
}
